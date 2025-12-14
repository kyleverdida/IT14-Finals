import { bucket } from "../firebase.js";
import { v4 as uuidv4 } from "uuid";

export const uploadToFirebase = (fileBuffer, originalName, mimeType) => {
  return new Promise((resolve, reject) => {
    const uuid = uuidv4();
    const fileName = `posts/${uuid}_${originalName}`;
    const file = bucket.file(fileName);

    const stream = file.createWriteStream({
      metadata: {
        contentType: mimeType,
        metadata: {
          firebaseStorageDownloadTokens: uuid,
        },
      },
    });

    stream.on("error", reject);

    stream.on("finish", () => {
      const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(file.name)}?alt=media&token=${uuid}`;
      resolve(url);
    });

    stream.end(fileBuffer);
  });
};
