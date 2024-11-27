const express = require("express");
const router = express.Router();

const {
    upload_img
} = require("../controllers/mult-controllers");

// TODO - Just making a note here cause I will need to handle this later ... MUST check that the file is an IMAGE before allowing any uploads
    // I'd think I can hopefully handle this on the front-end? If not than maybe the controller func or here as a last resort ... or in the upload engine itself

// Upload routes

    // TODO - I'm thinking I should at least move the second callback to the controllers file
        // And change upload_img to just upload and keep as an aux func
        // Or maybe I can put that in a new mult-engine file
        // And move the second callback to controllers
        // Since it is shaping up to handle the controller logic anyways
            // i.e. multer middleware uploads, then my controller handles the logic from there (with the uploaded file's ID now accessible from req)
router.post("/upload/banner", upload_img("banners").single("file"), (req, res) => {
    console.log(req.file.id); // Looks like this works thank god ... I can reference the new file by mongoID
    // It might just make sense here to create a new field in the user model which references the banner by ID
        // Since that's all I need to retrieve it ... that should make the logic easy to manage in theory
        // TODO - I will need to attach a reference to the user to the request before sending it
            // Or else I will not be able to put the image ID into the corresponding user doc
    res.status(201).json({message: "Image successfully uploaded"});
});

module.exports = router;