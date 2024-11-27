const express = require("express");
const router = express.Router();

const {
    upload
} = require("../middleware/mult-engine");

const {
    upload_banner
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
router.post("/upload/banner", upload("banners").single("file"), upload_banner);

module.exports = router;