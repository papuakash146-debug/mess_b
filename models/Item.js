import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  totalQuantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Item", itemSchema);
