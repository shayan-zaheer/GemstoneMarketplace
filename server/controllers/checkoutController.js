
const Order = require("../models/Order");

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


exports.validate = async(req,res,next)=>{
    
}