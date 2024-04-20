import { Account, Avatars, Client, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora",
  projectId: "662375c102aa9c7b157b",
  databaseId: "6623772e041ba1d13564",
  userCollectionId: "6623774e1748e4f8593e",
  videoCollectionId: "6623778ececd842becf7",
  storageId: "6623790eeca886bb14fb",
};

// Init your react-native SDK
const client = new Client();

client.setEndpoint(config.endpoint).setProject(config.projectId).setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials();

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (err) {
    console.log("error", err);
    throw new Error(err);
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (err) {
    console.log("err", err);
  }
}
