const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Gem = require("./Gem");

const Order = sequelize.define("Order", {
    status: {
        type: DataTypes.ENUM("pending", "shipped", "delivered"),
        defaultValue: "pending"
    }
});

User.hasMany(Order, { foreignKey: 'buyerId' }); // user can create multiple orders
Order.belongsTo(User, { foreignKey: 'buyerId' }); // one order belongs to one user

Gem.hasOne(Order, { foreignKey: 'productId' }); // one gem can only have one order
Order.belongsTo(Gem, { foreignKey: 'productId' }); // one order consist of only one gem

module.exports = Order;