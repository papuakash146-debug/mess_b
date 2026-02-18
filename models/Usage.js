import mongoose from "mongoose";

const usageSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true
  },
  usedQuantity: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model("Usage", usageSchema);
