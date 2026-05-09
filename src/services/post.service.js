const prisma = require("../lib/prisma");

//Get all posts
const getAllPosts = async ({ page = 1, limit = 10 }) => {
  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      skip,
      take: limit,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.post.count(),
  ]);

  return {
    posts,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page < Math.ceil(total / limit),
      hasPreviousPage: page > 1,
    },
  };
};

//Get one post

const getPostById = async (id) => {
  return await prisma.post.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      comments: true,
    },
  });
};

//create a post

const createPost = async ({ title, content, authorId }) => {
  return await prisma.post.create({
    data: { title, content, authorId },
  });
};

//update a post
const updatePost = async (id, { title, content }) => {
  return await prisma.post.update({
    where: { id: parseInt(id) },
    data: { title, content },
  });
};

//delete a post
const deletePost = async (id) => {
  return await prisma.post.delete({
    where: { id: parseInt(id) },
  });
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};
