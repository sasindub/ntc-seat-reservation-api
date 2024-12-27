import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  busId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  busNo: { type: String, required: true },
  noOfSeats: { type: Number, required: true },
});

export default mongoose.model("Bus", busSchema);
