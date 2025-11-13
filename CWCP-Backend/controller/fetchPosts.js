import userconcern from "../model/postModel.js"

export const fetchPosts = async (req, res) => {
  try {
    const Posts = await userconcern.find();

    if(Posts.length === 0){
        return res.status(404).json({ errorMessage: "no posts" });
    }
    res.status(200).json(Posts);
    
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getApprovedPosts = async (req, res) => {
  try {
    const posts = await userconcern.find({ approved: true });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
}

export const fetchPostsViaSearchbar = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Case-insensitive partial title search
    const posts = await userconcern.find({
      title: { $regex: query, $options: "i" },
    });

    // ✅ Return 200 with empty array instead of 404
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
