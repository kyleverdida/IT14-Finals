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

export const getTodayPostCount = async (req, res) => {
  try {
    // Start of today (00:00:00)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // End of today (23:59:59)
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const count = await userconcern.countDocuments({
      timestamp: {
        $gte: startOfToday,
        $lte: endOfToday,
      },
    });

    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


export const getResolvedPostPercentage = async (req, res) => {
  try {
    const totalPosts = await userconcern.countDocuments();

    if (totalPosts === 0) {
      return res.status(200).json({ percentage: 0 });
    }

    const resolvedPosts = await userconcern.countDocuments({
      status: "resolved",
    });

    const percentage = ((resolvedPosts / totalPosts) * 100).toFixed(2);

    res.status(200).json({
      percentage: Number(percentage),
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


// ✅ Get all RESOLVED concerns
export const getResolvedPosts = async (req, res) => {
  try {
    const posts = await userconcern.find({ status: "resolved" });

    if (posts.length === 0) {
      return res.status(404).json({ errorMessage: "no resolved posts" });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// ✅ Get all PENDING concerns
export const getPendingPosts = async (req, res) => {
  try {
    const posts = await userconcern.find({ status: "pending" });

    if (posts.length === 0) {
      return res.status(404).json({ errorMessage: "no pending posts" });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// ✅ Get all REJECTED concerns
export const getRejectedPosts = async (req, res) => {
  try {
    const posts = await userconcern.find({ approved : false });

    if (posts.length === 0) {
      return res.status(404).json({ errorMessage: "no rejected posts" });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

