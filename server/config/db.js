const { Sequelize } = require('sequelize');
const fs = require("fs");

const isLocal = process.env.DB_HOSTED_ON == "local"

console.log()
const sequelize = new Sequelize({
  host: isLocal ? 'localhost' : process.env.DB_HOST,
  dialect: 'postgres',
  username: isLocal ? process.env.LOCAL_USERNAME : process.env.DB_USER,
  password: isLocal ? process.env.LOCAL_PASS : process.env.DB_PASS,
  database: isLocal ? process.env.LOCAL_DB_NAME : process.env.DB_NAME,
  port: isLocal ? process.env.LOCAL_DB_PORT : process.env.DB_PORT,
  dialectOptions: !isLocal
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
          ca: fs.readFileSync("./config/ca.pem").toString(),
        },
      }
    : {},
});


console.log(sequelize,"RUnning on Local ->",isLocal)

const startSQL = async () => {
    try {
        await sequelize.authenticate();
        console.log("PostgreSQL running.");
        await sequelize.sync({ alter: true });
        console.log("DB synced successfully!");
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = {sequelize, startSQL};