import { NewUser, Post, PostToUpdate, SignIn, UserToDB, UserToUpdate } from '@/types/index'
import { account, appwriteConfig, avatars, databases, storage } from './appwrite'
import { ID, Query } from 'appwrite'

export async function createUserAccount(user: NewUser){
  try {
    const newAccount = await account.create(
      ID.unique(), 
      user.email, 
      user.password, 
      user.name,
    )

    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(user.name)

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      imageUrl: avatarUrl
    })

    return newUser

  } catch (err) {

    console.log(err)
    return err
  }
}

export async function saveUserToDB(user: UserToDB){
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId, 
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user
    )

    return newUser

  } catch (err) {
    console.log(err)
  }
}

export async function signInAccount(user: SignIn){
  try {
    const session = await account.createEmailSession(user.email, user.password)

    return session
  } catch (err) {
    console.log(err)
  }
}

export async function signOutAccount(){
  try {
    const session = await account.deleteSession("current")

    return session
  } catch (err) {
    console.log(err)
  }
}

export async function getCurrentUser(){
  try {
    const currentAccount = await account.get()

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentAccount) throw Error
    if (!currentUser) throw Error

    return currentUser.documents[0]
  } catch (err) {
    console.log(err)
  }
}

export async function createPost(post: Post){
  try {
    const uploadedFile = await uploadFile(post.file[0])
    const tags = post.tags?.replace(/ /g,'').split(',') || []

    if (uploadedFile){
      const fileUrl = getFilePreview(uploadedFile.$id)
      if (!fileUrl) {
        deleteFile(uploadedFile.$id)
        throw Error
      }

      const newPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postsCollectionId,
        ID.unique(),
        {
          creator: post.userId,
          title: post.title,
          content: post.content,
          imageUrl: fileUrl,
          imageId: uploadedFile?.$id,
          tags: tags
        }
      )

      if (!newPost){
        await deleteFile(uploadedFile.$id)
        throw Error
      }
  
      return newPost
    } else {
      const newPost = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postsCollectionId,
        ID.unique(),
        {
          creator: post.userId,
          title: post.title,
          content: post.content,
          tags: tags
        }
      )

      if (!newPost) throw Error
      return newPost
    }

  } catch (err) {
    console.log(err)
  }
}

export async function uploadFile(file: File){
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    )

    return uploadedFile
  } catch (err) {
    console.log(err)
  }
}

export async function deleteFile(fileId: string){
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId)

    return { status: 'ok' }
  } catch (err) {
    console.log(err)
  }
}

export function getFilePreview(fileId: string){
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      1000,
      1000,
      "top",
      100
    )
  
    return fileUrl
  } catch (err) {
    console.log(err)
  }
}

export async function getRecentPosts(){
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.postsCollectionId,
    [Query.orderDesc('$createdAt'), Query.limit(20)]
  )

  if (!posts) throw Error

  return posts
}

export async function likePost(postId: string, likesArray: string[]){
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
      {
        likes: likesArray
      }
    )

    if (!updatedPost) throw Error
    return updatedPost
  } catch (err){
    console.log(err)
  }
}

export async function savePost(postId: string, userId: string){
  try {
    const updatedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        post: postId,
        user: userId
      }
    )

    if (!updatedPost) throw Error
    return updatedPost
  } catch (err){
    console.log(err)
  }
}

export async function deleteSavedPost(savedRecordId: string){
  try {
    const deletedSavedPost = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId
    )

    if (!deletedSavedPost) throw Error
    return { status: 'ok' }
  } catch (err){
    console.log(err)
  }
}

export async function getPostById(postId: string){
  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId
    )

    return post
  } catch (err){
    console.log(err)
  }
}

export async function updatePost(post: PostToUpdate){
  const hasFileToUpdate = post?.file?.length > 0

  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId
    }

    const tags = post.tags?.replace(/ /g,'').split(',') || []

    if (hasFileToUpdate){
      const uploadedFile = await uploadFile(post.file[0])

      if (uploadedFile){
        const fileUrl = getFilePreview(uploadedFile.$id)

        if (!fileUrl) {
          deleteFile(uploadedFile.$id)
          throw Error
        }

        if (image) image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id}

        const updatedPost = await databases.updateDocument(
          appwriteConfig.databaseId,
          appwriteConfig.postsCollectionId,
          post.postId,
          {
            title: post.title,
            content: post.content,
            imageUrl: image?.imageUrl,
            imageId: image?.imageId,
            tags: tags
          }
        )

        if (!updatedPost){
          await deleteFile(post.imageId)
          throw Error
        }

        return updatedPost
      } 
    } else {
      const updatedPost = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.postsCollectionId,
        post.postId,
        {
          title: post.title,
          content: post.content,
          tags: tags
        }
      )

      if (!updatedPost) throw Error
      return updatedPost
    }
  } catch (err){
    console.log(err)
  }
}

export async function deletePost(postId: string, imageId?: string){
  if (!postId || !imageId) throw Error

  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postsCollectionId,
      postId,
    )
  } catch (err){
    console.log(err)
  }
}

export async function getUsers(num?: number){
  const queries: any[] = [Query.orderDesc('$createdAt')]

  if (num) queries.push(Query.limit(num))

  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      queries
    )

    if (!users) throw Error

    return users

  } catch (err){
    console.log(err)
  }
}

export async function updateUser(user: UserToUpdate){
  const hasFileToUpdate = user?.file?.length > 0

  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId
    }

    if (hasFileToUpdate){
      const uploadedFile = await uploadFile(user.file[0])

      if (!uploadedFile) throw Error

      const fileUrl = getFilePreview(uploadedFile.$id)

      if (!fileUrl) {
        deleteFile(uploadedFile.$id)
        throw Error
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id}

      const updatedUser = await databases.updateDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        user.id,
        {
          name: user.name,
          imageUrl: image.imageUrl,
          imageId: image.imageId,
          bio: user.bio
        }
      )

      if (!updatedUser){
        if (hasFileToUpdate) await deleteFile(image.imageId)
        throw Error
      }

      if (user.imageId && hasFileToUpdate) {
        await deleteFile(user.imageId);
      }

      return updatedUser
    }

  } catch (err){
    console.log(err)
  }
}