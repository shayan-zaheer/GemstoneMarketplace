const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Review = sequelize.define('Review', {
    orderId: {
        type: DataTypes.UUID,
        allowNull: false,
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

module.exports = Review;