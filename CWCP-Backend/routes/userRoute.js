import express from "express";
import upload from "../middleware/upload.js";
import { createPost } from "../controller/createPost.js";
import {
  fetchPosts,
  getApprovedPosts,
  fetchPostsViaSearchbar,
  getResolvedPosts,
  getPendingPosts,
  getRejectedPosts,
} from "../controller/fetchPosts.js";
import {
  approvePost,
  rejectPost,
  changeStatus,
} from "../controller/postController.js";
import { adminLogin } from "../authentication/adminLogin.js";
import {
  getPostStats,
  getAreaStats,
  getResolvedPostPercentage,
  getTodayPostCount,
} from "../statistics/statistics.js";

const route = express.Router();

route.post("/post", upload.single("image"), createPost);

route.get("/fetch", fetchPosts);
route.get("/getApproved", getApprovedPosts);
route.get("/search", fetchPostsViaSearchbar);
route.get("/posts/area/:area", getAreaStats);
route.get("/posts/today/count", getTodayPostCount);
route.get("/posts/resolved/percentage", getResolvedPostPercentage);
route.get("/posts/resolved", getResolvedPosts);
route.get("/posts/pending", getPendingPosts);
route.get("/posts/rejected", getRejectedPosts);

route.post("/login", adminLogin);
route.put("/approve/:id", approvePost);
route.put("/reject/:id", rejectPost);
route.put("/status/:id", changeStatus);

route.get("/stats", getPostStats);

export default route;
