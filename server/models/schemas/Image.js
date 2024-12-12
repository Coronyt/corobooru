const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const img_schema = new Schema({
    // Required image fields
    full: { // ObjectID of full res image in $user_id.imgs_full.files
        type: String,
        // required: true
    },
    thumb: { // ObjectID of thumbnail image in $user_id.imgs_thumb.files
        type: String,
        // required: true
    },
    tags: { // All image tags (each tag should be a valid key for booru map)
        type: Array,
        // required: true
    },
    // Additional details
    desc: {
        type: String
    },
    author: {
        type: String
    },
    source: {
        type: String
    },
    // Associated dates
    img_date: { // When was the photo taken or image published
        type: Date
    },
    post_date: { // When was the image posted to this booru
        type: Date
    },
});

module.exports = img_schema;