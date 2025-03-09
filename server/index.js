require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const gemsRoute = require("./routes/gemsRoutes");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const {startSQL} = require("./config/db");
const configurePassport = require("./utils/passport");

const app = express();
const PORT = process.env.PORT || 8000;

configurePassport(app);

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan("dev"));

app.use("/gems", gemsRoute);
app.use("/auth", authRoute);
app.use("/users", userRoute);

startSQL();

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});