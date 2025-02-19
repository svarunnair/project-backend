const express = require("express")
const UserController = require("./route/UserRouter")
const connectDb = require("./db")
const DataController = require("./route/DataRouter")
const app = express()
app.use(express.json())
require("dotenv").config()
const authentication= require('./middleware/middleware')



app.use('/login',UserController)
app.use("/data",authentication, DataController);




// app.get('/',(req,res)=>{
//     res.send("haaaii")
// })



app.listen(1000, ()=>{
    try{
  console.log("running 1000");
  connectDb()
    }
    catch{
  console.log("something went wrong");
    }
  
})