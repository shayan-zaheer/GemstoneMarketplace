const { DataTypes } = require("sequelize");
const User = require("./User");
const { sequelize } = require("../config/db");
const Img = require("./Img");

const Gem = sequelize.define(
    "Gem",
    {
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        coverImage: {
            type: DataTypes.TEXT,
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
        shape: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        purity: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        dimensions: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        weight: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        timestamps: true,
    }
);

Gem.belongsTo(User, {
    as: "owner",
    foreignKey: {
        name: "userId",
        allowNull: false,
    },
});

Gem.belongsTo(User, {
    as: "seller",
    foreignKey: {
        name: "soldBy",
        allowNull: true,
    },
});

User.hasMany(Gem, {
    foreignKey: "userId",
    as: "ownedGemstones",
    onDelete: "CASCADE",
});

User.hasMany(Gem, {
    foreignKey: "soldBy",
    as: "soldGemstones",
    onDelete: "SET NULL",
});

Gem.hasMany(Img, {
    foreignKey: "gemId",
    as: "moreImages",
    onDelete: "CASCADE",
});

Img.belongsTo(Gem, {
    foreignKey: {
        name: "gemId",
    },
});

module.exports = Gem;
