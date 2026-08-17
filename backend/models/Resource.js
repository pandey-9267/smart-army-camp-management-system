const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const resourceSchema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    default: true,
  },
  resourceName: {
    type: String,
    trim: true,
    required: true,
  },
  category: {
    type: String,
    enum: ["Water", "Food", "Fuel", "Medicine", "General Supplies"],
    required: true,
  },
  camp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Camp",
    required: true,
  },
  currentQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  unit: {
    type: String,
    trim: true,
    required: true,
  },
  minimumStockLevel: {
    type: Number,
    required: true,
    min: 0,
  },
  averageDailyConsumption: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Resource", resourceSchema);