const User = require("../models/User");
const mongoose = require("mongoose");

// Importing the third-party package "JWT" to create and manage web tokens
const jwt = require("jsonwebtoken");

// Auxiliary function for creating user tokens
    // Accepts MongoDB ID as arg
const sign_token = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "14d"});
}

// Login user
const login_user = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await User.login(username, password);
        const token = sign_token(user._id);
        res.status(200).json({username, token});
        console.log("User", username, "successfully logged in");
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

// Signup user
const signup_user = async (req, res) => {
    const {email, username, password} = req.body;
    try {
        const user = await User.signup(email, username, password);
        // If signup was successful, generate a new token
        const token = sign_token(user._id);
        res.status(201).json({username, token});
        console.log("User", username, "successfully signed up");
    } catch (err) {
        res.status(400).json({error: err.message})
    }
}

module.exports = {
    login_user,
    signup_user
}