const express = require("express");
const router = express.Router();
const gemsController = require("../controllers/gemsController");
const upload = require("../utils/multer")

const uploadMiddleware = (req, res, next) => {
    upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'coverImage', maxCount: 1 },
        { name: 'moreImages', maxCount: 5 }
    ])(req, res, (err) => {
        if (err) {
            console.error("Multer Error:", err);
            return res.status(400).json({ status: "fail", message: err.message });
        }
        next();
    });
};

router.route("/").get(gemsController.getAllGems).post(uploadMiddleware, gemsController.uploadGem);
router.route("/:productID").get(gemsController.getGemByID);
router.route("/delete/:id").delete(gemsController.deleteGem);
router.route("/update/:id").patch(gemsController.updateGem)
router.route("/userId/:id").get(gemsController.getGemByUser)

module.exports = router;