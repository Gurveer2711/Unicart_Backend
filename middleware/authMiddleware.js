import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import cookieParser from "cookie-parser";
// Protect routes
export const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token; // Access the token from the cookie

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied.Please log in again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("req.user:", req.user);// Attach the decoded user info to the request
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token. Please log in again." });
  }
});

// Admin middleware
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as an admin");
  }
};
