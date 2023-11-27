const express = require('express');
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const ProductModel = mongoose.model("ProductModel");
const { JWT_SECRET } = require('../config');
const protectedRoute = require("../middleware/protectedResource");


// Route to add a product (accessible to logged-in admins)
router.post("/add_product", protectedRoute, async (req, res) => {
    try {
        // Assuming that the request body contains necessary product information
        const { name, price, description, categories, photoUrl } = req.body;

        // Create a new product using the ProductModel
        const newProduct = new ProductModel({
            name: name,
            price: price,
            description: description,
            categories: categories,
            photoUrl: photoUrl,
            owner_id: req.user._id, // Assign the owner_id to the ID of the logged-in user
        });

        // Save the product to the database
        await newProduct.save();

        res.status(201).json({ message: "Product added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get All Products
router.get("/get_all_products", async (req, res) => {
    try {
        // Retrieve all products from the database
        const allProducts = await ProductModel.find();

        // Check if any products were found
        if (allProducts.length === 0) {
            return res.status(404).json({ error: "No products found" });
        }

        // Return the list of products
        res.status(200).json({ products: allProducts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get all products added by a particular owner (accessible to logged-in users)
router.get("/get_products_by_owner", protectedRoute, async (req, res) => {
    try {
        const ownerId = req.user._id;

        // Find products by owner ID
        const productsByOwner = await ProductModel.find({ owner_id: ownerId });

        // Check if any products were found
        if (productsByOwner.length === 0) {
            return res.status(404).json({ error: "No products found for the specified owner" });
        }

        // Return the list of products added by the specified owner
        res.status(200).json({ products: productsByOwner });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;


// Route to get a product by ID (accessible to anyone)
router.get("/get_product/:id", async (req, res) => {
    try {
        const productId = req.params.id;

        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        // Find the product by ID
        const product = await ProductModel.findById(productId);

        // Check if the product exists
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Return the product
        res.status(200).json({ product: product });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Route to delete a product by ID (only for the owner)
router.delete("/delete_product/:id", protectedRoute, async (req, res) => {
    try {
        const productId = req.params.id;

        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        // Find the product by ID
        const productToDelete = await ProductModel.findById(productId);

        // Check if the product exists
        if (!productToDelete) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if the logged-in user is the owner
        if (req.user._id.equals(productToDelete.owner_id)) {
            // Delete the product from the database
            await productToDelete.remove();
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            return res.status(403).json({ error: "Unauthorized. Only the product owner can delete this product." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Route to update a product by ID (only for the owner)
router.put("/update_product/:id", protectedRoute, async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, description, categories, photoUrl } = req.body;

        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        // Find the product by ID
        const productToUpdate = await ProductModel.findById(productId);

        // Check if the product exists
        if (!productToUpdate) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if the logged-in user is the owner
        if (req.user._id.equals(productToUpdate.owner_id)) {
            // Update the product fields
            productToUpdate.name = name || productToUpdate.name;
            productToUpdate.price = price || productToUpdate.price;
            productToUpdate.description = description || productToUpdate.description;
            productToUpdate.categories = categories || productToUpdate.categories;
            productToUpdate.photoUrl = photoUrl || productToUpdate.photoUrl;

            // Save the updated product to the database
            await productToUpdate.save();

            res.status(200).json({ message: "Product updated successfully" });
        } else {
            return res.status(403).json({ error: "Unauthorized. Only the product owner can update this product." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Route to get products by category ID (accessible to anyone)
router.get("/get_products_by_category/:category_id", async (req, res) => {
    try {
        const categoryId = req.params.category_id;

        // Check if the provided category ID is valid
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ error: "Invalid category ID" });
        }

        // Find products by category ID
        const productsByCategory = await ProductModel.find({ categories: categoryId });

        // Check if any products were found
        if (productsByCategory.length === 0) {
            return res.status(404).json({ error: "No products found for the specified category" });
        }

        // Return the list of products for the specified category
        res.status(200).json({ products: productsByCategory });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get products by two category IDs (accessible to anyone)
router.get("/get_products_by_categories/:category_id1/:category_id2", async (req, res) => {
    try {
        const categoryId1 = req.params.category_id1;
        const categoryId2 = req.params.category_id2;

        // Check if the provided category IDs are valid
        if (!mongoose.Types.ObjectId.isValid(categoryId1) || !mongoose.Types.ObjectId.isValid(categoryId2)) {
            return res.status(400).json({ error: "Invalid category ID" });
        }

        // Find products by both category IDs
        const productsByCategories = await ProductModel.find({
            categories: { $all: [categoryId1, categoryId2] }
        });

        // Check if any products were found
        if (productsByCategories.length === 0) {
            return res.status(404).json({ error: "No products found for the specified categories" });
        }

        // Return the list of products for the specified categories
        res.status(200).json({ products: productsByCategories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Route to add stock to a product (accessible to logged-in users)
router.put("/add_stock/:id", protectedRoute, async (req, res) => {
    try {
        const productId = req.params.id;
        // console.log(productId)
        const { stock } = req.body;
        // console.log(stock)

        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        // Find the product by ID
        const productToUpdate = await ProductModel.findById(productId);

        // Check if the product exists
        if (!productToUpdate) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if the logged-in user is the owner
        if (productToUpdate) {
            // Add the provided stock to the current stock
            productToUpdate.stock += parseInt(stock);

            // Save the updated product to the database
            await productToUpdate.save();

            res.status(200).json({ message: "Stock added successfully" });
        } else {
            return res.status(403).json({ error: "Unauthorized. Only the product owner can update stock." });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
