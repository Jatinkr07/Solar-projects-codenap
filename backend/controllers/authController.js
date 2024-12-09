import jwt from "jsonwebtoken";
import config from "../config/config.js";

export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (email !== config.ADMIN_EMAIL || password !== config.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ email }, config.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
};

export const getAdminDashboard = (req, res) => {
  res.json({ message: "Welcome to the Admin Dashboard!" });
};
