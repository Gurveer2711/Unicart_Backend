const express = require("express");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");
const { addProduct } = require("../controllers/adminController");

const router = express.Router();

router.post("/addProduct", authenticate, isAdmin, addProduct);

module.exports = router;
