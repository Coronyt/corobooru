const User = require("../models/User");
const Booru = require("../models/Booru");

const mongoose = require("mongoose");

const fs  = require("fs");
const { Readable } = require("stream");
const to_thumbnail = require("image-thumbnail");

const {
    upload
} = require("../middleware/mult-engine");

const assign_banner = async (req, res) => {
    try {
        await User.set_banner(req.params.user, req.file.id);
        res.status(201).json({message: "Image successfully uploaded"});
    } catch (err) {
        res.status(400).json({error: err.message}) // Generic error handler
    }
}

const find_banner = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.user });
        const local = await mongoose.createConnection(process.env.CLUSTER).asPromise();
        const bucket = new mongoose.mongo.GridFSBucket(local.db, { bucketName: "banners" });
        if (user.banner) {
            const _id = new mongoose.Types.ObjectId(`${user.banner}`);
            const rstream = bucket.openDownloadStream(_id);
            rstream.on("end", () => {
                local.close();
            });
            rstream.pipe(res);
        } else {
            res.status(400).json({error: "User has not uploaded banner"})
        }
    } catch (err) {
        res.status(400).json({error: err.message}) // Generic error handler
    }
}

const set_booru_header = async (req, res) => {
    try {
        await User.set_booru_header(req.params.user, req.body.header);
        res.status(200).json({message: "Header set successfully"});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

const upload_to_booru = async (req, res, next) => {
    const user = await User.findOne({ username: req.params.user });
    const multerware = upload("imgs_full").single("file");
    multerware(req, res, next);
}

const thumb_gen_aux = async (req, res, _id) => {
    try {
        // Open bucket to imgs_full dir in database
        const user = await User.findOne({ username: req.params.user });
        const local = await mongoose.createConnection(process.env.CLUSTER).asPromise();
        const bucket = new mongoose.mongo.GridFSBucket(local.db, { bucketName: "imgs_full" });
        // Read from stream into local buffer
        const rstream = bucket.openDownloadStream(_id);
        let buffer = Buffer.alloc(0);
        rstream.on("data", (chunk) => {
            buffer = Buffer.concat([buffer, chunk]);
        });
        rstream.on("end", async (chunk) => {
            console.log(buffer);
            // Create thumbnail from buffer data
            const thumbnail = await to_thumbnail(buffer, {
                percentage: 30,
                width: 200,
                height: 200,
                jpegOptions: {force: true},
                fit: "cover"
            });
            console.log("Thumbnail created");
            console.log(thumbnail);
            // Pipe thumbnail to imgs_thumb dir
            const res_bucket = new mongoose.mongo.GridFSBucket(local.db, { bucketName: "imgs_thumb" });
            const wstream = res_bucket.openUploadStream("thumbof_" + _id.toString());
            const readable = new Readable();
            readable._read = () => {}
            readable.push(thumbnail); // Wrap thumbnail buffer in Readable
            readable.push(null); // Denote end of stream with null value
            wstream.on("finish", () => {
                local.close();
            });
            readable.pipe(wstream);
        });
        return;
    } catch (err) {
        res.status(400).json({error: err.message}) // Generic error handler
    }
}

const assign_to_booru = async (req, res) => {
    try {
        const _id = new mongoose.Types.ObjectId(`${req.file.id.toString()}`);
        const thumb_id = await thumb_gen_aux(req, res, _id);
        await User.post_to_booru(req.file.id, req.body.tags, req.params.user);
        res.status(201).json({message: "Image successfully uploaded"});
    } catch (err) {
        res.status(400).json({error: err.message}) // Generic error handler
    }
}

const find_booru = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.user });
        const booru = await Booru.findById(user.booru);
        res.status(200).json({
            imgs: booru.imgs,
            tags: booru.tags,
            header: booru.header
        });
    } catch (err) {
        res.status(400).json({error: err.message}) // Generic error handler
    }
}

const find_img_full = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.user });
        const local = await mongoose.createConnection(process.env.CLUSTER).asPromise();
        const bucket = new mongoose.mongo.GridFSBucket(local.db, { bucketName: "imgs_full" });
        const _id = new mongoose.Types.ObjectId(`${req.params.id}`);
        const rstream = bucket.openDownloadStream(_id);
        rstream.on("end", () => {
            local.close();
        });
        rstream.pipe(res);
    } catch (err) {
        res.status(400).json({error: err.message}) // Generic error handler
    }
}

const find_img_thumb = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.user });
        const local = await mongoose.createConnection(process.env.CLUSTER).asPromise();
        const bucket = new mongoose.mongo.GridFSBucket(local.db, { bucketName: "imgs_thumb" });
        const rstream = bucket.openDownloadStreamByName(`thumbof_${req.params.id}`);
        rstream.on("end", () => {
            local.close();
        });
        rstream.pipe(res);
    } catch (err) {
        res.status(400).json({error: err.message}) // Generic error handler
    }
}

module.exports = {
    assign_banner,
    find_banner,
    set_booru_header,
    upload_to_booru,
    assign_to_booru,
    find_booru,
    find_img_full,
    find_img_thumb
}