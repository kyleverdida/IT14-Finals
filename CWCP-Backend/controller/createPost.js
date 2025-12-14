import Post from "../model/postModel.js";
import { uploadToFirebase } from "../util/uploadToFirebase.js";

export const createPost = async (req, res) => {
  try {
    // Validate that file is received
    if (!req.file || !req.file.buffer || req.file.size === 0) {
      return res.status(400).json({ error: "No valid image uploaded" });
    }

    const { title, timestamp, area, severity, description } = req.body;

    // Upload image to Firebase
    const imageUrl = await uploadToFirebase(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    // Save post in MongoDB
    const userPost = new Post({
      title,
      timestamp,
      area,
      severity,
      description,
      photo: imageUrl,
    });

    const savedData = await userPost.save();
    res.status(201).json(savedData);

  } catch (error) {
    console.error(error);
    if (error.message.includes("Invalid file type")) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ errorMessage: error.message });
  }
};
