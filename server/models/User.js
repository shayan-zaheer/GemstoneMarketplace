const {DataTypes} = require("sequelize");
const {sequelize} = require("../config/db");

const User = sequelize.define("User", {
    address: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    nonce: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    jwtToken: {
        type: DataTypes.STRING,
        allowNull: true,
    }
})

module.exports = User;