/* eslint-disable no-unused-vars */
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    if (decoded.email !== config.ADMIN_EMAIL) {
      return res
        .status(403)
        .json({ message: "Access forbidden: Not an admin" });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
