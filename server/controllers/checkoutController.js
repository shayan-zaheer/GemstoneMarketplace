
const Order = require("../models/Order");
const Gem = require("../models/Gem");
const Review = require("../models/Review");
const User = require("../models/User");

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
        include: ["Gem", "Buyer", "Seller", "Review"],
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

  exports.verifyOrderReceived = async (req, res, next) => {
    try {
        const { orderId } = req.params;
    
        if (!orderId) {
            return res.status(400).json({
                status: 'error',
                message: "Order ID is required",
            });
        }
    
        const order = await Order.findOne({
            where: { orderId },
            include: [
                { model: User, as: 'Buyer' },
                { model: User, as: 'Seller' },
                { model: Gem },
                { model: Review }
            ]
        });
    
        if (!order) {
            return res.status(404).json({
                status: 'error',
                message: "Order not found",
            });
        }
    
        const updatedOrder = await order.update({ isReceived: true }, {
            returning: true,
            include: [
                { model: User, as: 'Buyer' },
                { model: User, as: 'Seller' },
                { model: Gem },
                { model: Review }
            ]
        });
    
        res.status(200).json({
            status: 'success',
            message: "Order marked as received successfully",
            data: updatedOrder,
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            status: 'error',
            message: "Internal server error",
        });
    }
}

exports.reviewOrder = async (req, res, next) => {
  try {
      const { orderId } = req.params;
      const { rating, comment } = req.body;

      if (!orderId) {
          return res.status(400).json({
              message: "Order ID is required",
          });
      }

      const order = await Order.findOne({
          where: { orderId },
          include: [{
              model: Review,
              as: 'Review'
          }]
      });

      if (!order) {
          return res.status(404).json({
              message: "Order not found",
          });
      }

      if (order.Review) {
          return res.status(400).json({
              message: "This order already has a review",
          });
      }

      const review = await Review.create({
          orderId,
          rating,
          comment,
      });

      await order.reload({
          include: [Review]
      });

      res.status(201).json({
          message: "Review created successfully",
          data: {
              ...order.toJSON(),
              review: review.toJSON()
          }
      });
  } catch (e) {
      console.error(e);
      res.status(500).json({
          message: "Internal server error",
          error: process.env.NODE_ENV === 'development' ? e.message : undefined
      });
  }
}