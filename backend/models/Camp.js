const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const campSchema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    default: true,
  },
  campName: {
    type: String,
    trim: true,
    required: true,
  },
  location: {
    type: String,
    trim: true,
    required: true,
  },
  maximumCapacity: {
    type: Number,
    required: true,
    min: 1,
  },
  currentPersonnel: {
    type: Number,
    required: true,
    min: 0,
  },
  operationalStatus: {
    type: String,
    enum: ["Operational", "Limited", "Inactive"],
    default: "Operational",
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

module.exports = mongoose.model("Camp", campSchema);