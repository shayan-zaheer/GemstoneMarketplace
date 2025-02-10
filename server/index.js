require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: ["http://localhost:3000/"],
    credentials: true,
}));

app.use(morgan("dev"));

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})