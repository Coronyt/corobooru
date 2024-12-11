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
    // TODO - Nest below code in try/catch block
    const user = await User.findOne({ username: req.params.user });
    const local = await mongoose.createConnection(process.env.CLUSTER).asPromise();
    const bucket = new mongoose.mongo.GridFSBucket(local.db, { bucketName: "banners" });
    if (user.banner) {
        const _id = new mongoose.Types.ObjectId(`${user.banner}`);
        bucket.openDownloadStream(_id).pipe(res); // Will take _id as arg
    } else {
        res.status(400).json({error: "User has not uploaded banner"}) // TEMP
    }
}

const upload_to_booru = async (req, res, next) => {
    const user = await User.findOne({ username: req.params.user });
    const multerware = upload(`${user._id}.imgs_full`).single("file");
    // TODO - Need to upload thumbnail here too, somehow ...
    multerware(req, res, next);
}

const assign_to_booru = async (req, res) => {
    // TODO - Logic will have to implement here ...
        // User schema will contain "booru" map which will map tags to arrays of image objects or sub-schemas
        // So after uploading img_full and img_thumb, will need references to ObjectIDs of both documents
        // Then will need to call a static method on the User model which creates new "booru" entries
            // Every tag will need a reference to the image sub-schema for full and thumb res images
                // Will also need to create an "Image" model for storing metadata in a collection
            // If the tag does not exist as a key in the booru map, create tag and assign image
                // The tag will map to the ObjectID of the Image document in the user's collection
                // And the Image document will contain image details and references to full and thumb images
    res.status(201).json({message: "Image successfully uploaded"});
}

module.exports = {
    assign_banner,
    find_banner,
    upload_to_booru,
    assign_to_booru
}