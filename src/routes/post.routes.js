const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");
const protect = require("../middlewares/auth.middleware");
const {
  createPostSchema,
  updatePostSchema,
} = require("../schemas/post.schema");
const { validate } = require("../middlewares/validate.middleware");

// Get all posts
router.get("/", getAllPosts); // public
router.get("/:id", getPostById); // public
router.post("/", protect, validate(createPostSchema), createPost); // protected
router.patch("/:id", protect, validate(updatePostSchema), updatePost); // protected
router.delete("/:id", protect, deletePost); // protected

module.exports = router;
