import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: "Route", required: true },
});

export default mongoose.model("Trip", tripSchema);
