const express = require("express");
const router = express.Router();

const {
    upload
} = require("../middleware/mult-engine");

const {
    assign_banner
} = require("../controllers/mult-controllers");

// TODO - Just making a note here cause I will need to handle this later ... MUST check that the file is an IMAGE before allowing any uploads
    // I'd think I can hopefully handle this on the front-end? If not than maybe the controller func or here as a last resort ... or in the upload engine itself
    // Just had a thought that, in the event I'm not able to evaluate the image on the front-end, I could pass it through a middleware func before passing it to upload()

// Upload routes
router.post("/upload/banner", upload("banners").single("file"), assign_banner);

// ^ Logic flow is:
    // Req w/ file is received at route -> file is uploaded through multer engine -> req (now w/ _id) is handled by second callback which sets banner by ID in user document

module.exports = router;