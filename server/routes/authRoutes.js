const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.route("/nonce").get(authController.getNonce);
router.route("/verify").post(authController.verifySIWE);
router.route("/logout").post(authController.logout);

module.exports = router;