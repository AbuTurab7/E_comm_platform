export const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ message: messages[0], errors: messages });
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || "field";
    return res.status(409).json({ message: `Duplicate value for ${field}.` });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ message: `Invalid ${error.path}.` });
  }

  console.error(error);
  return res.status(error.statusCode || 500).json({
    message:
      error.message && error.statusCode
        ? error.message
        : "Internal server error.",
  });
};
