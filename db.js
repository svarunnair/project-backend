const mongoose = require("mongoose")
require('dotenv').config()


const connectDb =async()=>{
    try{
        await mongoose.connect(process.env.URL)
        console.log('db is connected')
    }
    catch{
        console.log('db is not connected')
    }
}

module.exports = connectDb;