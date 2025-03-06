const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/db");

const User = sequelize.define("User", {
    name: {
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
    }
})

module.exports = User;