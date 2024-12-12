const User = require("../models/User");
const mongoose = require("mongoose");

const {
    upload
} = require("../middleware/mult-engine");

const assign_banner = async (req, res) => {
    try {
        await User.set_banner(req.body.user, req.file.id); // Should I be instancing and assigning these variables first?
        res.status(201).json({message: "Image successfully uploaded"});
    } catch (err) {
        res.status(400).json({error: err.message}) // Generic error handler
    }
}

const find_banner = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.user });
        const local = await mongoose.createConnection(process.env.CLUSTER).asPromise();
        const bucket = new mongoose.mongo.GridFSBucket(local.db, { bucketName: "_banners" });
        if (user.banner) {
            const _id = new mongoose.Types.ObjectId(`${user.banner}`);
            bucket.openDownloadStream(_id).pipe(res); // Will take _id as arg
        } else {
            res.status(400).json({error: "User has not uploaded banner"}) // TEMP
        }
    } catch (err) {
        res.status(400).json({error: err.message}) // Generic error handler
    }
}

const upload_to_booru = async (req, res, next) => {
    const user = await User.findOne({ username: req.params.user });
    const multerware = upload(`${user._id}.imgs_full`).single("file");
    // TODO - Need to upload thumbnail here too, somehow ...
    multerware(req, res, next);
}

const assign_to_booru = async (req, res) => {
    try {
        // TODO - Does tag exist in user booru?
        // Right now it's only accepting a single tag
        await User.post_to_booru(req.file.id, req.body.tags, req.params.user);
            // TODO - If yes, append new Image to the tag value (array)
                // TODO - Need to define schema for Image documents
            // TODO - If no, create a new key for the tag in the booru and then append
        res.status(201).json({message: "Image successfully uploaded"});
    } catch (err) {
        res.status(400).json({error: err.message}) // Generic error handler
    }
}

module.exports = {
    assign_banner,
    find_banner,
    upload_to_booru,
    assign_to_booru
}