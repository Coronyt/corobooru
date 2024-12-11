const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Importing Image schema (to act as sub-schemas within "booru")
const Image = require("./Image");

// Importing the third-party package "bcrypt" to handle password hashing
const bcrypt = require("bcrypt");

// Importing the third-party package "validator" to validate email and password
const validator = require("validator");

const user_schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        default: ""
    },
    booru: {
        type: Image,
        default: {}
    }
});

user_schema.statics.login = async function (username, password) {
    const user = await this.findOne({username});
    // Running validations
    if (!username || !password) {
        throw Error("Missing username or password");
    }
    if (!user) {
        throw Error("No matching username");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) { // Matching password ...
        throw Error("Incorrect password");
    }
    // Return user document after validation
    return user;
}

user_schema.statics.signup = async function (email, username, password) {
    const email_exists = await this.findOne({email});
    const name_exists = await this.findOne({username});
    // Running validations
    if (!email || !username || !password) {
        throw Error("Missing required fields");
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Weak password rejected"); // TODO - Need to specify strong password criteria
    }
    if (!validator.isEmail(email)) {
        throw Error("Invalid email address");
    }
    if (email_exists) {
        throw Error("Email already in use");
    }
    if (name_exists) {
        throw Error("Username already in use");
    }
    // Salting and hashing password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({email, username, password: hash});
    // Returning new user document
    return user;
}

user_schema.statics.set_banner = async function (username, banner_ID) {
    const user = await this.findOne({username});
    user.banner = banner_ID; // Mongoose will interpret this as an updateOne() invocation for MongoDB
    const new_user = await user.save(); // Returns a promise ... resolves to the saved document if successful
    // Returning updated user document
    return new_user;
}

module.exports = mongoose.model("User", user_schema);