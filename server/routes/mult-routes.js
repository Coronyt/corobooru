const express = require("express");
const router = express.Router();

const {
    upload
} = require("../middleware/mult-engine");

const {
    assign_banner,
    find_banner,
    set_booru_header,
    upload_to_booru,
    assign_to_booru,
    find_booru,
    find_img_full,
    find_img_thumb
} = require("../controllers/mult-controllers");

// TODO - Just making a note here cause I will need to handle this later ... MUST check that the file is an IMAGE before allowing any uploads
    // I'd think I can hopefully handle this on the front-end? If not than maybe the controller func or here as a last resort ... or in the upload engine itself
    // Just had a thought that, in the event I'm not able to evaluate the image on the front-end, I could pass it through a middleware func before passing it to upload()

// TODO - Another thought regarding the banner upload logic ... make sure that only authenticated users can upload to THEIR OWN BOARDS
    // i.e. If an authorized user sends a request to change a different user's banner ... that shouldn't be possible and must be prevented

// Upload routes
router.post("/upload/banner/:user", upload("banners").single("file"), assign_banner);
router.post("/upload/booru/:user", upload_to_booru, assign_to_booru);

// ^ Logic flow is:
    // Req w/ file is received at route -> file is uploaded through multer engine -> req (now w/ _id) is handled by second callback which sets banner by ID in user document

router.put("/config/booru/:user", set_booru_header);

// Retrieval routes
router.get("/find/banner/:user", find_banner); // Will return a stream of the user's banner
router.get("/find/booru/:user", find_booru); // Will return a copy of the user's booru
router.get("/find/booru/:user/imgs_full/:id", find_img_full); // Full image by _id
router.get("/find/booru/:user/imgs_thumb/:id", find_img_thumb); // Thumbnail by _id

module.exports = router;