import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
  timeDuration: { type: String, required: true }, // Format: "HH:mm-HH:mm"
  date: { type: Date, required: true },
  qty: { type: Number, required: true },
  ticketPrice: { type: Number, required: true },
  total: { type: Number, required: true }, // Calculated as `qty * ticketPrice`
});

export default mongoose.model("Booking", bookingSchema);
