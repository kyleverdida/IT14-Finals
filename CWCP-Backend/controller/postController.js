
import userconcern from "../model/postModel.js";

export const approvePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await userconcern.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.approved) {
      return res.status(400).json({ message: "Post is already approved" });
    }

    post.approved = true;
    const updatedPost = await post.save();

    res.status(200).json({
      message: "Post approved successfully",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const rejectPost = async (req, res) => {
  try {
    console.log("req.body:", req.body);
const { reason } = req.body || {};
console.log("reason:", reason);


    
    if (!reason || reason.trim() === "") {
      return res.status(400).json({
        message: "Rejection reason is required"
      });
    }

    const post = await userconcern.findByIdAndUpdate(
      req.params.id,
      {
        status: "rejected",
        approved: false,
        rejection_reason: reason
      },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const changeStatus = async (req, res) => {
  try {
    const { id } = req.params; // post id
    const { status } = req.body; // new status value (e.g., "pending", "ongoing", "resolved")

    // validate inputs
    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }

    const post = await userconcern.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    post.status = status;
    await post.save();

    res.status(200).json({ message: "Post status updated successfully.", post });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


