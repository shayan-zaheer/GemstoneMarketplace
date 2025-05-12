const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { ensureAuthenticated } = require("../middlewares/auth");

router.route("/stats").get(adminController.getAdminDashboardData)
router.route("/revByDay").get(adminController.getRevenueByDay)
router.route("/revByName").get(adminController.getRevenueByName)

module.exports = router;