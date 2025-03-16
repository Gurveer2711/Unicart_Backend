import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const router = express.Router();

// Upload image to local 'uploads/' folder
router.post("/local", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({ message: "File uploaded successfully", filePath: req.file.path });
});

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

export default router;
