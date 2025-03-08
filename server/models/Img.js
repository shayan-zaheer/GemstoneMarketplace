const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Img = sequelize.define(
    "Img",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        path: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Img;