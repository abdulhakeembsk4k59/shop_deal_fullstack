const express = require('express');
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const CustomerModel = mongoose.model("CustomerModel");
const { JWT_SECRET } = require('../config');
const protectedRoute = require("../middleware/protectedResource");


router.post("/signup", (req, res) => {
    const { name, email, phone, password } = req.body;
    if (!name || !phone  || !password || !email) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    CustomerModel.findOne({ email: email })
        .then((userInDB) => {
            if (userInDB) {
                return res.status(500).json({ error: "User with this email already registered" });
            }
            bcryptjs.hash(password, 16)
                .then((hashedPassword) => {
                    const user = new CustomerModel({ name, email,  phone, password: hashedPassword });
                    user.save()
                        .then((newUser) => {
                            res.status(201).json({ result: "User Signed up Successfully!" });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }).catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
});

router.post("/admin_signup", (req, res) => {
    const { name, email,  phone, password } = req.body;
    const isAdmin = true;
    if (!name  || !phone  || !password || !email ) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    CustomerModel.findOne({ email: email })
        .then((userInDB) => {
            if (userInDB) {
                return res.status(500).json({ error: "User with this email already registered" });
            }
            bcryptjs.hash(password, 16)
                .then((hashedPassword) => {
                    const user = new CustomerModel({ name, email,  phone, password: hashedPassword, isAdmin });
                    user.save()
                        .then((newUser) => {
                            res.status(201).json({ result: "User Signed up Successfully!" });
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }).catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    CustomerModel.findOne({ email: email })
        .then((userInDB) => {
            if (!userInDB) {
                return res.status(401).json({ error: "Invalid Credentials" });
            }
            bcryptjs.compare(password, userInDB.password)
                .then((didMatch) => {
                    if (didMatch) {
                        const jwtToken = jwt.sign({ _id: userInDB._id }, JWT_SECRET);
                        const userInfo = { "_id": userInDB._id, "email": userInDB.email, "name": userInDB.name, "isAdmin": userInDB.isAdmin };
                        res.status(200).json({ result: { token: jwtToken, user: userInfo } });
                    } else {
                        return res.status(401).json({ error: "Invalid Credentials" });
                    }
                }).catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
});



// Route to get customer details by ID (accessible to any logged-in user, but not for customers accessing admin details)
router.get("/get_customer/:id", protectedRoute, async (req, res) => {
    try {
        const customerId = req.params.id;

        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(customerId)) {
            return res.status(400).json({ error: "Invalid customer ID" });
        }

        // Find the customer by ID
        const customer = await CustomerModel.findById(customerId);

        // Check if the customer exists
        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        // Check if the logged-in user is a customer accessing admin details
        if (!req.user.isAdmin && customer.isAdmin) {
            return res.status(403).json({ error: "Unauthorized. Customers cannot access admin details." });
        }

        // Return the customer details
        res.status(200).json({ customer: customer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Route to update customer details (accessible only to the logged-in user)
router.put("/update_customer", protectedRoute, async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, email, address, phone } = req.body;

        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        // Find the user by ID
        const userToUpdate = await CustomerModel.findById(userId);

        // Check if the user exists
        if (!userToUpdate) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the logged-in user is updating their own details
        if (!userToUpdate._id.equals(req.user._id)) {
            return res.status(403).json({ error: "Unauthorized. Users can only update their own details." });
        }

        // Update the user fields
        userToUpdate.name = name || userToUpdate.name;
        userToUpdate.email = email || userToUpdate.email;
        userToUpdate.address = address || userToUpdate.address;
        userToUpdate.phone = phone || userToUpdate.phone;

        // Save the updated user details to the database
        await userToUpdate.save();

        res.status(200).json({ message: "User details updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Route to delete a user by ID (only for admins)
router.delete("/delete_user/:id", protectedRoute, async (req, res) => {
    try {
        const userId = req.params.id;

        // Check if the provided ID is valid
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }

        // Find the user by ID
        const userToDelete = await CustomerModel.findById(userId);

        // Check if the user exists
        if (!userToDelete) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the logged-in user is an admin
        if (!req.user.isAdmin) {
            return res.status(403).json({ error: "Unauthorized. Only admins can delete users." });
        }

        // Delete the user from the database
        await userToDelete.remove();

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/get_all_users", protectedRoute, async (req, res) => {
    try {
        // Fetch all users from the database
        const allUsers = await CustomerModel.find();

        // Return the list of users
        res.status(200).json({ users: allUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;