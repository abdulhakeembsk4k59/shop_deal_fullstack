const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const SalesModel = mongoose.model("SalesModel");
const UserModel = mongoose.model("UserModel");
const protectedRoute = require("../middleware/protectedResource");

// Function to get today's start and end times
function getTodayTimes() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);
    return { today, endOfDay };
}

// Error Handling Middleware
function errorHandler(error, req, res, next) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
}

// Middleware to handle user not found
async function findUser(req, res, next) {
    try {
        const user = await UserModel.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        next();
    } catch (error) {
        next(error);
    }
}

// All users' posts
router.get("/allsales", (req, res) => {
    SalesModel.find()
        .populate("author", "_id firstName")
        .then((dbPosts) => {
            res.status(200).json({ posts: dbPosts });
        })
        .catch(errorHandler);
});

// Today's top 5 sales
router.get("/todays_top_5_sales", protectedRoute, findUser, async (req, res) => {
    try {
        const { today, endOfDay } = getTodayTimes();

        const todaySales = await SalesModel
            .find({
                author: req.user._id,
                sale_time: { $gte: today, $lte: endOfDay }
            })
            .populate("author", "_id firstName lastName")
            .sort({ sale_time: -1 })
            .limit(5);

        res.status(200).json({ sales: todaySales });
    } catch (error) {
        errorHandler(error, req, res);
    }
});

// Calculate and return the total revenue
router.get("/total_revenue", protectedRoute, findUser, async (req, res) => {
    try {
        const { today, endOfDay } = getTodayTimes();

        const totalRevenue = await SalesModel.aggregate([
            {
                $match: {
                    author: req.user._id,
                    sale_time: { $gte: today, $lte: endOfDay }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);

        const revenue = totalRevenue.length > 0 ? totalRevenue[0].totalAmount : 0;
        res.status(200).json({ totalRevenue: revenue });
    } catch (error) {
        errorHandler(error, req, res);
    }
});

// Add sales
router.post("/add_sales", protectedRoute, (req, res) => {
    const { product_name, quantity, amount } = req.body;
    if (!product_name || !quantity || !amount) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    req.user.password = undefined;

    const sale_time = new Date(); // Set sale_time to the current date and time
    const salesObj = new SalesModel({ product_name, quantity, amount, author: req.user, sale_time });

    salesObj.save()
        .then((newSale) => {
            res.status(201).json({ post: newSale });
        })
        .catch(errorHandler);
});

module.exports = router;
