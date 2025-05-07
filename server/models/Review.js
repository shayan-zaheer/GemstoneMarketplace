const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Order = require('./Order');

const Review = sequelize.define('Review', {
    orderId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Orders',
            key: 'orderId'
        }
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true,
        trim: true
    }
});

Review.belongsTo(Order, { foreignKey: 'orderId' });

module.exports = Review;