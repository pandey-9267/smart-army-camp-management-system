const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const consumptionSchema = new mongoose.Schema({
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Resource",
    required: true,
  },
  camp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Camp",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  quantityUsed: {
    type: Number,
    required: true,
    min: 0.01,
  },
  openingQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  remainingQuantity: {
    type: Number,
    required: true,
    min: 0,
  },
  recordedBy: {
    type: String,
    trim: true,
  },
  remarks: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Consumption", consumptionSchema);