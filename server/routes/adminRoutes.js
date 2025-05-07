const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { ensureAuthenticated } = require("../middlewares/auth");

router.route("/stats").get(ensureAuthenticated, adminController.getAdminDashboardData)

module.exports = router;