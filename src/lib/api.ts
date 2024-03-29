import { NewUser, Post, SignIn, UserToDB } from '@/types/index'
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
    const uploadedFile = post.file && await uploadFile(post.file[0])

    const fileUrl = uploadedFile && getFilePreview(uploadedFile.$id)
    if (!fileUrl && uploadedFile) {
      deleteFile(uploadedFile.$id)
      throw Error
    }

    const tags = post.tags?.replace(/ /g,'').split(',') || []

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

    if (!newPost && uploadedFile){
      await deleteFile(uploadedFile.$id)
      throw Error
    }

    return newPost
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

export async function getFilePreview(fileId: string){
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
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