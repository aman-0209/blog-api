const postService = require("../services/post.service");

// Get /api/posts
const getAllPosts = async (req, res) => {
  try {
    //read query params for pagination and filtering

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    //validate

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        error: "Page and limit must be positive integers",
      });
    }

    if (limit > 100) {
      return res.status(400).json({ error: "Limit cannot exceed 100" });
    }
    const result = await postService.getAllPosts({ page, limit });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get /api/posts/:id
const getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//post /api/posts
const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await postService.createPost({
      title,
      content,
      authorId: req.user.id,
    });
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// PATCH /api/posts/:id -- check

const updatePost = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.authorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this post",
      });
    }

    const updated = await postService.updatePost(req.params.id, req.body);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Delete /api/posts/:id
const deletePost = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    //authorization check
    if (post.authorId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this post",
      });
    }

    await postService.deletePost(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
