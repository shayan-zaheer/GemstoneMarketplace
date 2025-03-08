const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define(
    "User",
    {
        userId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        residenceAddress: {
            type: DataTypes.STRING,
        },
        contact: {
            type: DataTypes.STRING,
        },
        profileImage: {
            type: DataTypes.STRING,
        },
        cnic: {
            type: DataTypes.STRING,
            unique: true,
        },
        walletAddress: {
            type: DataTypes.STRING,
            unique: true,
        },
    }
)

module.exports = User;