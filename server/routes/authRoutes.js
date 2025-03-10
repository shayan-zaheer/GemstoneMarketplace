const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.route("/signup").post(authController.signUp);
router.route("/login").post(authController.login);
router.route("/logout").get(authController.logout)
router.route("/status").get((request, response) => {
    if (request.isAuthenticated()) {
        return response.status(200).json({ status: "authenticated", user: request.user });
    } else {
        return response.status(400).json({ status: "unauthenticated" });
    }
});

module.exports = router;