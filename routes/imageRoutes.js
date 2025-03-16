import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import path from "path";

const router = express.Router();

// Upload image to local 'uploads/' folder
router.post("/uploadImage", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ message: "File uploaded successfully", filePath: req.file.path });
});

// Upload image to Cloudinary
router.post("/cloudinary", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads",
    });

    // Delete local file after upload
    fs.unlinkSync(req.file.path);

    res.json({ message: "File uploaded successfully", url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

// Remove local file
router.post("/removeImage", (req, res) => {
  const { filePath } = req.body;
  if (!filePath) {
    return res
      .status(400)
      .json({ success: false, message: "No file path provided" });
  }

  fs.unlink(filePath, (err) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete file" });
    }
    res.json({ success: true, message: "File deleted successfully" });
  });
});

export default router;
