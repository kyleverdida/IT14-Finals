import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    photo: {
      type: String,
    },
    area: {
      type: String,
      required: true,
    },
    severity: {
      type: String,
      // enum: ["inconvenient", "hazard", "life-threatening"],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    approved: {
      type: Boolean,
      default: false,
    },
    rejection_reason: {
      type: String,
      required: function () {
        return this.status === "rejected";
      },
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "resolved", "rejected"],
      default: "pending",
    },

    action_taken: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("userconcern", postSchema);
