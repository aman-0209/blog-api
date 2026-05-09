const express = require("express");
const router = express.Router({
  mergeParams: true, // to access postId from parent route
});
const protect = require("../middlewares/auth.middleware");
const {
  getAllComments,
  createComment,
  deleteComment,
} = require("../controllers/comment.controller");
const { validate } = require("../middlewares/validate.middleware");
const { createCommentSchema } = require("../schemas/comment.schema");

// Get comments for a specific post
router.get("/", getAllComments); //public route

// Create a new comment
router.post("/", protect, validate(createCommentSchema), createComment); //protected route
// Delete a comment
router.delete("/:commentId", protect, deleteComment); //protected route

module.exports = router;
