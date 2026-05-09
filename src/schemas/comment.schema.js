const { z } = require("zod");

const createCommentSchema = z.object({
  content: z
    .string()
    .min(1, { message: "Comment cannot be empty" })
    .max(500, { message: "Comment must be less than 500 characters long" }),
});

module.exports = {
  createCommentSchema,
};
