const express = require('express');
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const CategoryModel = mongoose.model("CategoryModel");
const { JWT_SECRET } = require('../config');
const protectedRoute = require("../middleware/protectedResource");


router.post("/add_category", protectedRoute, async (req, res) => {
    try {
        const { name, description } = req.body;

        // Check if mandatory fields are provided
        if (!name || !description) {
            return res.status(400).json({ error: "One or more mandatory fields are empty" });
        }

        // Check if the user is an admin
        if (!req.user.isAdmin) {
            return res.status(403).json({ error: "Unauthorized. Only admins can add categories." });
        }

        // Check if the category already exists
        const existingCategory = await CategoryModel.findOne({ name: name });
        if (existingCategory) {
            return res.status(409).json({ error: "Category with the same name already exists" });
        }

        // Create a new unique category using the CategoryModel
        const newCategory = new CategoryModel({
            name: name,
            description: description
        });

        // Save the unique category to the database
        await newCategory.save();

        res.status(201).json({ message: "Category added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/get_all_categories", async (req, res) => {
    try {
        // Retrieve all categories from the database
        const allCategories = await CategoryModel.find();

        // Check if any categories were found
        if (allCategories.length === 0) {
            return res.status(404).json({ error: "No categories found" });
        }

        // Return the list of categories
        res.status(200).json({ categories: allCategories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Route to get a particular category by ID
router.get("/get_category/:id", async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ error: "Invalid category ID" });
        }

        // Find the category by ID
        const category = await CategoryModel.findById(categoryId);

        // Check if the category exists
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        // Return the specific category
        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/delete_category/:id", protectedRoute, async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ error: "Invalid category ID" });
        }

        // Find the category by ID
        const categoryToDelete = await CategoryModel.findById(categoryId);

        // Check if the category exists
        if (!categoryToDelete) {
            return res.status(404).json({ error: "Category not found" });
        }

        // Check if the user is an admin
        if (!req.user.isAdmin) {
            return res.status(403).json({ error: "Unauthorized. Only admins can delete categories." });
        }

        // Delete the category from the database
        await categoryToDelete.remove();

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/get_category_by_name/:name", async (req, res) => {
    try {
        const categoryName = req.params.name;

        // Find the category by name
        const category = await CategoryModel.findOne({ name: categoryName });

        // Check if the category exists
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        // Return the specific category
        res.status(200).json({ category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;


// Route to update a category based on ID (only for logged-in admins)
router.put("/update_category/:id", protectedRoute, async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name, description } = req.body;

        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ error: "Invalid category ID" });
        }

        // Find the category by ID
        const categoryToUpdate = await CategoryModel.findById(categoryId);

        // Check if the category exists
        if (!categoryToUpdate) {
            return res.status(404).json({ error: "Category not found" });
        }

        // Check if the user is an admin
        if (!req.user.isAdmin) {
            return res.status(403).json({ error: "Unauthorized. Only admins can update categories." });
        }

        // Update the category fields
        categoryToUpdate.name = name || categoryToUpdate.name;
        categoryToUpdate.description = description || categoryToUpdate.description;

        // Save the updated category to the database
        await categoryToUpdate.save();

        res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports = router;