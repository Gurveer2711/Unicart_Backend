const Product = require("../models/productModel");

// Add a new product (Admin only)
exports.addProduct = async (req, res) => {
  try {
    const { title, price, description, category, image } = req.body;

    const product = new Product({
      title,
      price,
      description,
      category,
      image,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
