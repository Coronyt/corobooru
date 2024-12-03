const User = require("../models/User");
const mongoose = require("mongoose");

const assign_banner = async (req, res) => {
    // console.log(req.file.id); // Looks like this works thank god ... I can reference the new file by mongoID
    // It might just make sense here to create a new field in the user model which references the banner by ID
        // Since that's all I need to retrieve it ... that should make the logic easy to manage in theory
        // TODO - I will need to attach a reference to the user to the request before sending it
            // Or else I will not be able to put the image ID into the corresponding user doc
    // res.status(201).json({message: "Image successfully uploaded"});
    // const banner_ID = req.file.id;
    // console.log(req.body.user); // This will get the "user" field if it was previously attached to req
    try {
        await User.set_banner(req.body.user, req.file.id); // Should I be instancing and assigning these variables first?
        res.status(201).json({message: "Image successfully uploaded"});
    } catch (err) {
        res.status(400).json({error: err.message}) // Generic error handler
    }
}

const find_banner = async (req, res) => {
    // TODO - Nest below code in try/catch block
    // TODO - Logic for mapping user
    // console.log(req.params.user);
    const user = await User.findOne({ username: req.params.user });
    // console.log(user.banner);
    // ___
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