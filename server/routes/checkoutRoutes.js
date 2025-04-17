const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");



router
    .route("/order/:orderId").get(checkoutController.getOrderByOrderId);
router
    .route("/order/bId/:buyerId").get(checkoutController.getOrdersByBuyer);
router
    .route("/checkout").post(checkoutController.checkout);


module.exports = router;
