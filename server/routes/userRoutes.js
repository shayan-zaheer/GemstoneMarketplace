const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { upload } = require("../utils/multer");

router
    .route("/:id")
    .get(userController.getUserById)
    .patch(upload.single("profileImage"), userController.updateUser);

module.exports = router;
