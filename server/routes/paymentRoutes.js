const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { upload } = require("../utils/multer");
const paymentController = require("../controllers/paymentController")

router
    .route("/approvePayment").post(paymentController.approveURL);

    router.route("/cancelPayment").post(paymentController.cancelURL);
    
    router.route("/declinePayment").post(paymentController.declineURL);

module.exports = router;
