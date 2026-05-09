const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");
const protect = require("../middleware/auth.middleware");

// Get all posts
router.get("/", getAllPosts); // public
router.get("/:id", getPostById); // public
router.post("/", protect, createPost); // protected
router.patch("/:id", protect, updatePost); // protected
router.delete("/:id", protect, deletePost); // protected

module.exports = router;
