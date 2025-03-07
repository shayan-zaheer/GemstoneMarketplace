require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const gemsRoute = require("./routes/gemsRoutes");
const authRoute = require("./routes/authRoutes");
const {startSQL,sequelize} = require("./config/db");


const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan("dev"));

app.use("/gems", gemsRoute);
app.use("/auth", authRoute);

startSQL();
// sequelize.sync({ force: true })
//   .then(() => {
//     console.log('Database tables recreated!');
//   })
//   .catch((err) => console.error('Error syncing database:', err));


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});