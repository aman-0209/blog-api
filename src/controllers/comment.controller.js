const commentService = require("../services/comment.service");
const postService = require("../services/post.service");

// Get /api/posts/:postId/comments
const getAllComments = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const comments = await commentService.getCommentsByPostId(
      req.params.postId,
    );
    if (comments.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No comments for this post" });
    }
    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/posts/:postId/comments
const createComment = async (req, res) => {
  try {
    const { content } = req.body;

    const post = await postService.getPostById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = await commentService.createComment({
      content,
      authorId: req.user.id,
      postId: req.params.postId,
    });
    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/posts/:postId/comments/:commentId
const deleteComment = async (req, res) => {
  try {
    //1 check if the post exists\

    const post = await postService.getPostById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    //2 check if the comment exists
    const comment = await commentService.getCommentById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // 3. Check comment belongs to this post ← also add this!

    if (comment.postId !== parseInt(req.params.postId)) {
      return res
        .status(400)
        .json({ error: "Comment does not belong to this post" });
    }

    //4. Check if the user is the author of the comment

    if (comment.authorId !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    //5 delete the comment

    await commentService.deleteComment(req.params.commentId);
    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllComments,
  createComment,
  deleteComment,
};
