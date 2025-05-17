const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const bcrypt = require("bcryptjs");

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
            unique: true,
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
        role: {
            type: DataTypes.ENUM,
            values: ["admin", "user"],
            defaultValue: "user",
        }
    }, {
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed("password")) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            },
        },
    }
)

module.exports = User;