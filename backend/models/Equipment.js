const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const equipmentSchema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    default: true,
  },

  equipmentName: {
    type: String,
    trim: true,
    required: true,
  },

  equipmentId: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },

  category: {
    type: String,
    enum: [
      "Power Equipment",
      "Water Equipment",
      "Utility Vehicle",
      "Communication Equipment",
      "Medical Equipment",
      "General Equipment",
    ],
    required: true,
  },

  camp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Camp",
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: 1,
  },

  condition: {
    type: String,
    enum: ["Excellent", "Good", "Fair", "Poor"],
    default: "Good",
  },

  operationalStatus: {
    type: String,
    enum: ["Operational", "Maintenance Due", "Under Maintenance"],
    default: "Operational",
  },

  lastMaintenanceDate: {
    type: Date,
  },

  nextMaintenanceDate: {
    type: Date,
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

module.exports = mongoose.model("Equipment", equipmentSchema);