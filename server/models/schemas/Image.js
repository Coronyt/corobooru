const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const img_schema = new Schema({
    full: { // ObjectID of full res image in $user_id.imgs_full.files
        type: String,
    },
    tags: { // All image tags (each tag should be a valid key for booru map)
        type: Array,
    },
    desc: {
        type: String
    },
    author: {
        type: String
    },
    source: {
        type: String
    },
    img_date: { // When was the photo taken or image published
        type: Date
    },
    post_date: { // When was the image posted to this booru
        type: Date
    },
});

module.exports = img_schema;