import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true }, // Added username
  password: { type: String, required: true }, // Added password
  NIC: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, default: null }, // Not mandatory
  role: { 
    type: String, 
    required: true, 
    enum: ["admin", "commuter", "bus_operator"], // Allowed roles
  },
});

export default mongoose.model("User", userSchema);
