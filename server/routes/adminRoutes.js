const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.route("/stats").get(adminController.getAdminDashboardData)

module.exports = router;