const { sellGem } = require("../blockchainInterface/sellGem");
const Gem = require("../models/Gem");
const Order = require("../models/Order");
const User = require("../models/User");
const { getIO, getClients } = require("../utils/socket");

exports.approveURL = async (req, res, next) => {
    const { order_id } = req.body.data.notification.metadata;
    try {
        const io = getIO();
        const clients = getClients();

        const paymentStatus = req.body.data.notification.state;
        const transactionId = req.body.data.notification.tracker;

        const [updatedRowsCount, updatedOrders] = await Order.update(
            { paymentStatus, transactionId },
            {
                where: { orderId: order_id },
                returning: true,
            }
        );

        if (updatedRowsCount === 0 || !updatedOrders.length) {
            return res.status(404).json({ message: "Order not found" });
        }

        const { buyerId, sellerId, gemId } = updatedOrders[0];

        await Gem.update(
            {
                userId: buyerId,
                soldBy: sellerId,
            },
            {
                where: { id: gemId },
            }
        );

        const newOwnerAddress = await User.findByPk(buyerId,{
            select:['walletAddress']
        })


        if(paymentStatus.toLowerCase() == "paid") await sellGem(gemId,newOwnerAddress)

        if (clients.has(buyerId)) {
            io.to(clients.get(buyerId)).emit("paymentSuccess", {
                orderId: order_id,
                paymentStatus,
                transactionId,
            });
        }

        res.status(200).json({
            data: order_id,
            message: "PAYMENT SUCCESSFUL",
        });
    } catch (e) {
        console.log(e);
        res.status(400).json({
            data: order_id,
            message: e.message,
        });
    }
};

exports.declineURL = async (req, res, next) => {
    console.log(req.body);
    res.status(400).json({
        data: { ...req.body },
        message: "PAYMENT DECLINED",
    });
};

exports.cancelURL = async (req, res, next) => {
    console.log(req.body);
    res.status(400).json({
        data: { ...req.body },
        message: "PAYMENT CANCEL",
    });
};
