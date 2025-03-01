const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Gem = sequelize.define(
    "Gem",
    {
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        coverImage: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        owner: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Gem;
