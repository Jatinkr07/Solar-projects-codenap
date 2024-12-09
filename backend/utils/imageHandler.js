// You can extend this with image validation, e.g., file types, sizes
export const validateImages = (req, res, next) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }
  next();
};
