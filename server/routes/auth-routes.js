const express = require("express");
const router = express.Router();

const {
    login_user,
    signup_user,
} = require("../controllers/auth-controllers");

// Login route
router.post("/login", login_user);

// Signup route
router.post("/signup", signup_user);

module.exports = router;