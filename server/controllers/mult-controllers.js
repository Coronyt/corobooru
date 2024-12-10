const User = require("../models/User");
const mongoose = require("mongoose");

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

module.exports = {
    assign_banner,
    find_banner
}