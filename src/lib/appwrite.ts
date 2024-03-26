import { Client, Databases, Account, Storage, Avatars } from "appwrite";

const client: Client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('660141619ac11526aa99');

export const account: Account = new Account(client);
export const database: Databases = new Databases(client);
export const storage: Storage = new Storage(client);
export const avatars: Avatars = new Avatars(client);