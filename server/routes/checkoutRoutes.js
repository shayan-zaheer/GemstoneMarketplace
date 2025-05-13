const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");
const { ensureAuthenticated } = require("../middlewares/auth");

router
    .route("/order/:orderId").get( checkoutController.getOrderByOrderId);
router
    .route("/order/bId/:buyerId").get( checkoutController.getOrdersByBuyer);
router
    .route("/checkout").post( checkoutController.checkout);

router.route("/verify/:orderId").patch( checkoutController.verifyOrderReceived);

router.route("/review/:orderId").post( checkoutController.reviewOrder);

module.exports = router;
