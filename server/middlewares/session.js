const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const { Pool } = require("pg");
const fs = require("fs");

const pgPool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync("./config/ca.pem").toString()
    }
});

const sessionMiddleware = session({
    store: new pgSession({
        pool: pgPool,
        tableName: "session",
        createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        secure: false,
        sameSite: "none"
    }
});

module.exports = sessionMiddleware;