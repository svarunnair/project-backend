const {Router} = require("express");
const DataModal = require("../modals/Data.modal");
const DataController = Router()



DataController.post('/',async(req,res)=>{
    const {name,email,password,role,hospitals} = req.body
    if (!name || !email || !password || !role) {
      res
        .status(400)
        .send({
          success: false,
          message:
            "Name, email,password,role are required and cannot be empty..",
        });
    }
    if (!["ADMIN", "USER", "GUEST"].includes(role)) {
      return res.status(400).send({
        success: false,
        message:
          "Role is not valid. Only ADMIN, USER, or GUEST roles are allowed.",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid email format." });
    }
    if (!Array.isArray(hospitals) || hospitals.length === 0) {
      return res
        .status(400)
        .send({
          success: false,
          message: "Hospitals must be a non-empty array.",
        });
    }
    for(item of hospitals){
        if(!item.hospitalName){
            return res.status(400).send({
              success: false,
              message:
                "Hospital name is required.",
            });
        }
    }

    try{
        const data = await new DataModal({
          name: name,
          email: email,
          password: password,
          hospital: hospitals,
          role: role,
        });

        data.save()
        res.send({status:true, message:"Data added successfully"})
    }
    catch{
        res.status(500).send({ error: err.message });
    }

})



module.exports = DataController;