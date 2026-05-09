const { z } = require("zod");

const createPostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be less than 100 characters long" }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long" }),
});

const updatePostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must be less than 100 characters long" })
    .optional(),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long" })
    .optional(),
});

module.exports = {
  createPostSchema,
  updatePostSchema,
};
