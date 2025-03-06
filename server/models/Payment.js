const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Order = require("./Order");

const Payment = sequelize.define("Payment", {
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "completed", "failed"),
        defaultValue: "pending"
    }
});

Payment.belongsTo(Order, {foreignKey: "orderId"}); // one payment consists of only one order
Order.hasOne(Payment, {foreignKey: "orderId"}); // one order has only one payment

module.exports = Payment;