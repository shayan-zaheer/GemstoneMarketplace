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
        owner: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        uploadDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now
        },
    },
    {
        timestamps: true,
    }
);

module.exports = Gem;
