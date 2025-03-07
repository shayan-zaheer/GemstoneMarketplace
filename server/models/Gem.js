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
    },
    {
        timestamps: true,
    }
);

Gem.belongsTo(User, { foreignKey: "userId", as: "owner" }); // gem belongs to single user
User.hasMany(Gem, { foreignKey: "userId" }); // user has many gems

Gem.hasMany(Img, { foreignKey: "gemId", as: "moreImages" });
Img.belongsTo(Gem, {
    foreignKey: {
        name: "gemId",
    },
});

module.exports = Gem;
