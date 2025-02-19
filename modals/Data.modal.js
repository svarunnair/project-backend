const mongoose = require('mongoose')

const roles = ["ADMIN", "USER", "GUEST"];


const branchSchema = new mongoose.Schema({
  branchName :{type:String,required:true},
  department:[]
})

const hospitalSchema = new mongoose.Schema({
  hospitalName: { type: String, required: true },
  branch: [branchSchema],
});

const dataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  hospital:[hospitalSchema],
  role: {type:String,required:true,enum:roles}
});


const DataModal = mongoose.model("DataEntry", dataSchema);


module.exports = DataModal

