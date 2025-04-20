const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");



router
    .route("/validatePayment").post(checkoutController.validate);
router
    .route("/checkout").post(checkoutController.checkout);


module.exports = router;
