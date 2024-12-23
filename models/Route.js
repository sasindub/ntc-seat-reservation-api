import mongoose from "mongoose";

const routeSchema = new mongoose.Schema({
  routeNo: { type: String, required: true, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  startTime: { type: String, required: true }, // Format: "HH:mm"
  endTime: { type: String, required: true }, // Format: "HH:mm"
  ticketPrice: { type: Number, required: true },
});

export default mongoose.model("Route", routeSchema);
