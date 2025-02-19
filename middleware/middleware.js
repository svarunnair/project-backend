const jwt = require("jsonwebtoken")
require("dotenv").config()


const authentication =(req,res,next)=>{
    const token = req.headers?.authorization?.split(" ")[1];

    console.log("req.headers", req.headers);
    console.log("token", token);

    if(!token){
        res.send("Please login")
    }
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     const user_id = decoded.user_id;
     if (decoded) {
       req.body.user_id = user_id;
       next();
     } else {
       res.send("Please Login");
     }
}


module.exports = authentication

