const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const maintenanceSchema = new mongoose.Schema({
  enabled: {
    type: Boolean,
    default: true,
  },

  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipment",
    required: true,
  },

  maintenanceDate: {
    type: Date,
    required: true,
  },

  type: {
    type: String,
    enum: ["Preventive", "Repair", "Inspection"],
    required: true,
  },

  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Overdue"],
    default: "Scheduled",
  },

  technician: {
    type: String,
    trim: true,
  },

  cost: {
    type: Number,
    min: 0,
    default: 0,
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

module.exports = mongoose.model("Maintenance", maintenanceSchema);