const prisma = require("../lib/prisma");

//Get all comments
const getCommentsByPostId = async (postId) => {
  return await prisma.comment.findMany({
    where: {
      postId: parseInt(postId),
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

//create a comment
const createComment = async ({ content, authorId, postId }) => {
  return await prisma.comment.create({
    data: { content, authorId, postId: parseInt(postId) },
  });
};

//Delete a comment
const deleteComment = async (id) => {
  return await prisma.comment.delete({
    where: { id: parseInt(id) },
  });
};

//get a comment by id
const getCommentById = async (id) => {
  return await prisma.comment.findUnique({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  getCommentsByPostId,
  createComment,
  deleteComment,
  getCommentById,
};
