const { DataTypes } = require("sequelize");
const User = require("./User");
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

Gem.belongsTo(User, { foreignKey: "userId" }); // gem belongs to single user
User.hasMany(Gem, { foreignKey: "userId" }); // user has many gems

module.exports = Gem;
