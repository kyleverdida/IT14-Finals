import Post from "../model/postModel.js";

export const createPost = async (req, res) => {
  try {
    const { title, timestamp, area, severity, description} = req.body;

    const userPost = new Post({
      title,
      timestamp,
      area,
      severity,
      description,
      photo: req.file ? req.file.filename : null, // save filename or null
      
    });

    const savedData = await userPost.save();
    res.status(200).json(savedData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
