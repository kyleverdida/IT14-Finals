import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  photo: {
    type: String // Store image URL or file path
  },
  area: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ["inconvenient", "hazard", "life-threatening"],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  approved: {
    type: Boolean,
    default: false // ensure every doc has this
  },
  status: {
    type: String,
    default: "pending", // default status
    enum: ["pending", "ongoing", "resolved"] 
  }
});

export default mongoose.model("userconcern", postSchema);
