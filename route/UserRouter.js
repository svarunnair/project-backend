const {Router} = require("express")
const {SignupModal} = require("../modals/Signup.modal")
const UserController = Router()
const  jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const SignupModel = require("../modals/Signup.modal");


UserController.post('/',async(req,res)=>{

    const {email, password, name } = req.body
     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid Email ID" });
  }
  if (!password || password.trim() === "") {
    return res.status(400).json({ message: "Password is required" });
  }
  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Name is required" });
  }


    try{
        const emailExisting  = await SignupModel.findOne({email})
        if(emailExisting){
            res.status(400).json({message:"Email ID is already existing"})
        }
        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new SignupModel({
            email,
            name,
            password:hashedPassword
        })

        await newUser.save()

        // const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        //   expiresIn: "1h",
        // });

        return res.status(201).json({
            message:"Registration successfully completed",
            // token,
            user:{name:newUser.name, email: newUser.email}
        })
    
    }
    catch(error){
     console.error("Error during signup:", error.message);
     return res.status(500).json({ message: "Internal Server Error" });
    }
    
})



UserController.post('/signin',async(req,res)=>{
  const {email, password} = req.body

  try {
    const user = await SignupModel.findOne({ email });
    if (!user) {
      return res.json({ message: "User is not found" });
    }

    const passwordCheck =  await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });

    return res.json({
      message: "Login Successful",
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error during signin:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
})



module.exports = UserController