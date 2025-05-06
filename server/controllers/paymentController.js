const { sellGem } = require("../blockchainInterface/sellGem");
const Gem = require("../models/Gem");
const Order = require("../models/Order");
const User = require("../models/User");
const { getIO, getClients } = require("../utils/socket");

exports.approveURL = async (req, res, next) => {
    console.log(req.body.data)
    if(!req.body.data.notification.metadata){
        return res.status(400).json({
            status:"failed",
            message:"Invalid Request"
        })
    }
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
        //returning response early to avoid timeout
        res.status(200).json({
            data: order_id,
            message: "PAYMENT SUCCESSFUL",
        });

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

console.log(newOwnerAddress,
    "Owner Address"
)
        if(paymentStatus.toLowerCase() == "paid") {
            const blockData = await sellGem(gemId,newOwnerAddress.dataValues.walletAddress)
            
//from blockData extract blockchain transaction id and store in db
console.log(blockData,"LINE 56")
await Order.update(
    { blockchainTxId:blockData.hash },
    {
        where: { orderId: order_id },
       
    }
)
            if (clients.has(buyerId)) {
            io.to(clients.get(buyerId)).emit("paymentSuccess", {
                orderId: order_id,
                paymentStatus,
                transactionId,
            });
        }

       
    }
   
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
