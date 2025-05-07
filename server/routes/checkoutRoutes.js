const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");
const { ensureAuthenticated } = require("../middlewares/auth");

router
    .route("/order/:orderId").get(ensureAuthenticated, checkoutController.getOrderByOrderId);
router
    .route("/order/bId/:buyerId").get(ensureAuthenticated, checkoutController.getOrdersByBuyer);
router
    .route("/checkout").post(ensureAuthenticated, checkoutController.checkout);

router.route("/verify/:orderId").patch(ensureAuthenticated, checkoutController.verifyOrderReceived);

router.route("/review/:orderId").post(ensureAuthenticated, checkoutController.reviewOrder);

module.exports = router;
