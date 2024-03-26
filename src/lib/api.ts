import { INewUser } from '@/types/index'
import { account } from './appwrite'
import { ID } from 'appwrite'

export async function createUserAccount(user: INewUser){
  try {
    const newAccount = await account.create(
      ID.unique(), 
      user.email, 
      user.password, 
      user.name,
    )
    return newAccount

  } catch (err) {
    console.log(err)
    return err
  }
}