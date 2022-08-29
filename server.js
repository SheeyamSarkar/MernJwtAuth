require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/userModel");
const app = express();

const dbConnect = require("./config/dbConnect");

const authAPI = require("./apis/authApi");
const emailAPI = require("./apis/emailApi");
const employeeAPI = require("./apis/employeeApi");


//dbConnection
dbConnect();

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//routes
// app.get("/",(req,res)=>{
//     res.send("MERN JWT AUTH")
// });

//apis
app.use("/api/auth", authAPI);
app.use("/api/email", emailAPI);
app.use("/api/employee", employeeAPI);


//port
const port = process.env.PORT || 5001

app.listen(port, ()=>console.log(`Server Is Running On PORT ${port}`));