const express = require('express');
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const CartModel = mongoose.model("CartModel");
const ProductModel = mongoose.model("ProductModel");
const { JWT_SECRET } = require('../config');
const protectedRoute = require("../middleware/protectedResource");


// Add item to the cart route
router.post('/add-to-cart', protectedRoute, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const customerId = req.user.id; // Assuming user id is stored in the request after authentication

    // Check if the product is already in the cart
    let cart = await CartModel.findOne({ customerId });

    if (!cart) {
      // If the cart doesn't exist, create a new one
      cart = new CartModel({ customerId, products: [] });
    }

    const existingProduct = cart.products.find(product => product.productRef.toString() === productId);

    if (existingProduct) {
      // If the product is already in the cart, update the quantity
      existingProduct.quantity += quantity;
    } else {
      // If the product is not in the cart, add it
      const product = await ProductModel.findById(productId);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      cart.products.push({ productRef: productId, quantity });
    }

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Item added to the cart successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

  




module.exports = router;