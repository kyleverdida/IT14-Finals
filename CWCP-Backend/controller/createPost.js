import Post from "../model/postModel.js";
import { uploadToFirebase } from "../util/uploadToFirebase.js";

export const createPost = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer || req.file.size === 0) {
      return res.status(400).json({ error: "No valid image uploaded" });
    }

    const { title, timestamp, area, severity, description } = req.body;

    const imageUrl = await uploadToFirebase(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    const userPost = new Post({
      title,
      timestamp,
      area,
      severity,
      description,
      photo: imageUrl,
    });

    const savedData = await userPost.save();

    // 👇 Explicit response with ID
    res.status(201).json({
      message: "Concern submitted successfully",
      id: savedData._id,   // 👈 OBJECT ID
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: error.message });
  }
};

