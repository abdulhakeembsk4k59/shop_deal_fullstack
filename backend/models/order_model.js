const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomerModel',
        required: true,
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ProductModel',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    amount: {
        type: Number,
        required: true,
    },
    shipping_info: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        phno: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        fullAddress: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        zipcode: {
            type: String,
            required: true,
        },
    },
    // New field to store the time when the order was placed
    orderTime: {
        type: Date,
        default: Date.now,
    },
});

mongoose.model("OrderModel", orderSchema);
