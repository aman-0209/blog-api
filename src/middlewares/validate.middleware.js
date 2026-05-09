const validate = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // In Zod v4, errors are in result.error.message as a JSON string
      const errors = JSON.parse(result.error.message).map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        errors,
      });
    }

    req.body = result.data;
    next();
  };
};

module.exports = { validate };
