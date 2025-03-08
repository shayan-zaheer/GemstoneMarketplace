const express = require("express");
const router = express.Router();
const gemsController = require("../controllers/gemsController");
const upload = require("../utils/multer")

const uploadMiddleware = upload.fields([
    { name: 'image', maxCount: 1 },    // 1 Profile Picture
    { name: 'coverImage', maxCount: 1 },      // 1 Cover Photo
    { name: 'moreImages', maxCount: 5 }     // Up to 5 Gallery Images
]);




router.route("/").get(gemsController.getAllGems);
router.route("/:productID").get(gemsController.getGemByID);
router.route("/upload").post(uploadMiddleware,gemsController.uploadGem);
router.route("/delete/:id").delete(gemsController.deleteGem);

module.exports = router;