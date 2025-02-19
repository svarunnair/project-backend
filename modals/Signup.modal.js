const mongoose = require("mongoose");

// Define the schema
const signupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const SignupModel = mongoose.model("loginData", signupSchema);

module.exports = SignupModel;
