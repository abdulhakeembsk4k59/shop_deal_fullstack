const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const OrderModel = mongoose.model("OrderModel");

const protectedRoute = require("../middleware/protectedResource");

// Route to add a new order
router.post("/add_order", protectedRoute, async (req, res) => {
    try {
        // Check if the user is logged in
        if (!req.user) {
            return res.status(401).json({ error: "User not logged in" });
        }

        const { customerId, products, amount, shipping_info } = req.body;

        // Create a new order using the OrderModel
        const newOrder = new OrderModel({
            customerId: customerId,
            products: products,
            amount: amount,
            shipping_info: shipping_info,
        });

        // Save the order to the database
        await newOrder.save();

        res.status(201).json({ message: "Order added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a specific order by ID
router.get('/get_order/:orderId', async (req, res) => {
    try {
        const order = await OrderModel.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Check if 'products' field exists before populating
        if (order.products && order.products.length > 0) {
            // Populate nested 'products' array
            await OrderModel.populate(order, { path: 'products.product' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Route to get orders history by user_id
router.get('/get_orders_history', protectedRoute, async (req, res) => {
    try {
        // Check if the user is logged in
        if (!req.user) {
            return res.status(401).json({ error: "User not logged in" });
        }

        const userId = req.user._id;

        // Fetch orders history for the specified user_id
        const ordersHistory = await OrderModel.find({ customerId: userId });

        if (!ordersHistory || ordersHistory.length === 0) {
            return res.status(404).json({ message: 'Orders history not found for the user' });
        }

        res.status(200).json(ordersHistory);
    } catch (error) {
        console.error('Error fetching orders history:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
