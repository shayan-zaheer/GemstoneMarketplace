require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const gemsRoute = require("./routes/gemsRoutes");
const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const payRoutes = require("./routes/paymentRoutes");
const chRoutes = require("./routes/checkoutRoutes");
const adRoutes = require("./routes/adminRoutes");
const { startSQL } = require("./config/db");
const { initializeSocket } = require("./utils/socket");
const { configurePassport } = require("./utils/passport");
const cookieParser = require("cookie-parser");
const {sellGem,getHistory} = require("./blockchainInterface/sellGem");

const app = express();
const PORT = process.env.PORT || 8000;

configurePassport(app);

app.use(
    cors({
        origin: ["https://gemstone-marketplace-three.vercel.app/","http://localhost:3000"],
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan("dev"));

app.use("/gems", gemsRoute);
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/pay", payRoutes);
app.use("/buy", chRoutes);
app.use("/admin", adRoutes);


//just testing blockchain function
app.get("/test",async (req,res)=>{
    const {gemId} = req.body
   const data = await getHistory(gemId);
//    const data = await sellGem(1,"0xE4336Ca3Aefa5Ce6457A8c36bE8842Ba8B309547");
    res.status(200).json({
        status:"Success",
        message:"Hello",
        data
    })
})

startSQL();

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
    console.log(`Running in ${process.env.NODE_ENV} mode`);
});
