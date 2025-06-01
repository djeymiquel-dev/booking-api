const conflictErrorHandler = (err, req, res, next) => {
  if (err.name === "ConflictError") {
    return res.status(409).json({ message: err.message });
  }
};

export default conflictErrorHandler;
