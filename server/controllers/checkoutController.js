
const Order = require("../models/Order");
const Gem = require("../models/Gem");

exports.checkout = async (req, res, next) => {
    try {
        const { gemId, sellerId } = req.body;

        // Assuming buyerId comes from the authenticated user (e.g., from JWT middleware)
        const buyerId = req.user?.userId;

        if (!buyerId || !gemId || !sellerId) {
            return res.status(400).json({ message: "Missing required fields: gemId, sellerId or user not authenticated" });
        }

        const newOrder = await Order.create({
            gemId,
            buyerId,
            sellerId,
            paymentStatus: "Pending",
            transactionId: null,
        });

        return res.status(201).json({
            message: "Order created successfully. Payment pending.",
            order: newOrder,
        });
    } catch (err) {
        console.error("Checkout error:", err);
        return res.status(500).json({
            message: "Something went wrong during checkout",
            error: err.message,
        });
    }
};


exports.getOrderByOrderId = async (req, res, next) => {
    try {
      const { orderId } = req.params;
  
      if (!orderId) {
        return res.status(400).json({
          message: "Order ID is required",
        });
      }
  
      const order = await Order.findOne({
        where: { orderId },
        include: ["Gem", "Buyer", "Seller"], // assuming you’ve defined associations with these aliases
      });
  
      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: order,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };


  exports.getOrdersByBuyer = async (req, res, next) => {
    try {
      const { buyerId } = req.params;
  
      if (!buyerId) {
        return res.status(400).json({
          message: "Buyer ID is required",
        });
      }
  
      const orders = await Order.findAll({
        where: { buyerId },
        include: [
          {
            model: Gem,
            as: "Gem", // This should match your alias in association
          }
        ],
      });
  
      if (!orders.length) {
        return res.status(404).json({
          message: "No orders found for this buyer",
        });
      }
  
      res.status(200).json({
        message: "Orders fetched successfully",
        data: orders,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };