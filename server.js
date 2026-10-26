require("dotenv").config();

const express = require("express");
// const morgan = require("morgan");
const userRouter = require("./Router/UserRouter");
const logger = require("./Middleware/logger");
const app = express();


app.use(express.json());
app.use("/",userRouter);
app.use(logger);
// app.use(morgan("dev"));

app.listen(3000, ()=>{
    console.log("Serving listening on port 3000")
});