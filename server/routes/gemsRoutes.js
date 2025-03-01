const express = require("express");
const router = express.Router();
const gemsController = require("../controllers/gemsController");

router.route("/").get(gemsController.getAllGems);
router.route("/:productID").get(gemsController.getGemByID);
router.route("/upload").post(gemsController.uploadGem);

module.exports = router;