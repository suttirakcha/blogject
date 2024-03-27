import { NewUser, SignIn, User, UserToDB } from '@/types/index'
import { account, appwriteConfig, avatars, databases } from './appwrite'
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