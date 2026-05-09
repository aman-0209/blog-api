const express = require("express");
const router = express.Router({
  mergeParams: true, // to access postId from parent route
});
const protect = require("../middleware/auth.middleware");
const {
  getAllComments,
  createComment,
  deleteComment,
} = require("../controllers/comment.controller");

// Get comments for a specific post
router.get("/", getAllComments); //public route

// Create a new comment
router.post("/", protect, createComment); //protected route
// Delete a comment
router.delete("/:commentId", protect, deleteComment); //protected route

module.exports = router;
