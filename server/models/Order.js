const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Gem = require("./Gem");



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
            model: "Gems", // the table name
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
});

module.exports = Order;
