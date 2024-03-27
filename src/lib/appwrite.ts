import { Client, Databases, Account, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  url: 'https://cloud.appwrite.io/v1',
  projectId: '660141619ac11526aa99',
  databaseId: '6602a35918673eb771b2',
  savesCollectionId: '6602a41a0ddddf002696',
  usersCollectionId: '6602a40432b83d4292d7',
  postsCollectionId: '6602a35c438c3332f71d',
  storageId: '6602a34aa3d04d12eb78'
}

const client: Client = new Client();

client
  .setEndpoint(appwriteConfig.url)
  .setProject(appwriteConfig.projectId);

export const account: Account = new Account(client);
export const databases: Databases = new Databases(client);
export const storage: Storage = new Storage(client);
export const avatars: Avatars = new Avatars(client);