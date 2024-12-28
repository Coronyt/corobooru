const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Image = require("./schemas/Image");
const Booru = require("./Booru");

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
        type: String,
        required: true
    }
}, { collection: "__users" });

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
    // Creating Booru for user
    const booru = await Booru.create({owner: username});
    // Creating user in database
    const user = await this.create({email, username, password: hash, booru: booru._id});
    // Returning new user document
    return user;
}

user_schema.statics.set_banner = async function (username, banner_ID) {
    const user = await this.findOne({username});
    user.banner = banner_ID; // Mongoose will interpret this as an updateOne() invocation for MongoDB
    const result = await user.save(); // Returns a promise ... resolves to the saved document if successful
    // Returning updated user document
    return result;
}

user_schema.statics.post_to_booru = async function (full_ID, tags, username) {
    const user = await this.findOne({username});
    // Running validations
    if (!user) {
        throw Error("User not found");
    }
    // Creating Image from schema
    const img = new Schema({
        data: {
            type: Image,
            default: {}
        }
    });
    // Setting image fields
    img.full = full_ID;
    // TODO - Validate before splitting and assigning
    const tag_arr = tags.split(" ");
    img.tags = tag_arr;
    // Updating booru
    const booru = await Booru.findById(user.booru);
    booru.imgs.push(img);
    tag_arr.forEach((tag) => {
        // For each tag in the given tag arr ...
        // 1. Check to see if the tag exists in booru
        if (Array.from(booru.tags.keys()).includes(tag)) {
            // 2. If it does, append img to the tag's array
            booru.tags.get(tag).push(img);
        } else {
            // 3. If not, create the mapping and instance val as [img]
            booru.tags.set(tag, [img]);
        }
    });
    await booru.save();
    const result = await user.save();
    return result;
}

module.exports = mongoose.model("User", user_schema);