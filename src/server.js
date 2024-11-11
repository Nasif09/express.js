const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

const routes = require("./routes");
const { notFoundHandler, errorHandler } = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();


//database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Database connection successful"))
.catch((err) => console.log(err));

//request  parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookie
app.use(cookieParser(process.env.COOKIE_SECRET));

//routes
app.use("/api/v1", routes);

// //404 not found handler
app.use(notFoundHandler);

app.listen(process.env.PORT,()=> {
    console.log(`app listen to port ${process.env.PORT}`)
})