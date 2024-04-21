import { Account, Avatars, Client, Databases, Storage, ID, Query } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora",
  projectId: "662375c102aa9c7b157b",
  databaseId: "6623772e041ba1d13564",
  userCollectionId: "6623774e1748e4f8593e",
  videoCollectionId: "6623778ececd842becf7",
  storageId: "6623790eeca886bb14fb",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

// Init your react-native SDK
const client = new Client();

client.setEndpoint(endpoint).setProject(projectId).setPlatform(platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Register User
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, username);
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials();

    await signIn(email, password);

    const newUser = await databases.createDocument(databaseId, userCollectionId, ID.unique(), {
      accountId: newAccount.$id,
      email,
      username,
      avatar: avatarUrl,
    });
    console.log("newUser", newUser);
    return newUser;
  } catch (err) {
    console.log("error", err);
    throw new Error(err);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);
    console.log("session", session);
    return session;
  } catch (err) {
    console.log("err", err);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(databaseId, userCollectionId, [
      Query.equal("accountId", currentAccount.$id),
    ]);

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (err) {
    console.log("err", err);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      Query.orderDesc("$createdAt")
    );

    return posts.documents;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.orderDesc("$createdAt", Query.limit(7)),
    ]);

    return posts.documents;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.search("title", query),
    ]);

    return posts.documents;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getUsersPosts = async (id) => {
  console.log("id", id);
  try {
    const posts = await databases.listDocuments(databaseId, videoCollectionId, [
      Query.equal("creator", id),
      Query.orderDesc("$createdAt"),
    ]);

    return posts.documents;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const signout = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (err) {
    throw new Error(err);
  }
};

const getFilePreview = async (fileId, type) => {
  let lifeUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, "top", 50);
    } else {
      throw new Error("Invalid Input type");
    }

    return lifeUrl;
  } catch (error) {
    throw new Error(error);
  }
};

const uploadFile = async (file, type) => {
  if (!file) return;

  const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const uploadedFile = await storage.createFile(storageId, ID.unique(), asset);
    console.log("UPLAODEDDED", uploadedFile);

    const fileUrl = await getFilePreview(uploadedFile.$id, type);

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const createVideo = async (form) => {
  console.log("FORM FORM", form);
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(databaseId, videoCollectionId, ID.unique(), {
      title: form.title,
      thumbnail: thumbnailUrl,
      video: videoUrl,
      prompt: form.prompt,
      creator: form.userId,
    });

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
};
