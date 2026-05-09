const express = require("express");
require("dotenv").config();
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.route");
const protect = require("./middlewares/auth.middleware");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts/:postId/comments", commentRoutes);
// app.get("/api/profile", protect, (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: `Welcome user ${req.user.id}`,
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
