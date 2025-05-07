const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Gem = require("./Gem");
const Review = require("./Review");

const Order = sequelize.define("Order", {
    orderId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    gemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Gems",
            key: "id",
        },
    },
    buyerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "userId",
        },
    },
    sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users",
            key: "userId",
        },
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pending",
    },
    transactionId: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    blockchainTxId:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    isReceived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});

Order.belongsTo(Gem, { foreignKey: 'gemId' });
Order.belongsTo(User, { as: 'Buyer', foreignKey: 'buyerId' });
Order.belongsTo(User, { as: 'Seller', foreignKey: 'sellerId' });
Order.hasOne(Review, { foreignKey: 'orderId' });
Review.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = Order;