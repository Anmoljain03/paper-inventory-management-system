const mongoose = require("mongoose");

const assignedPaperSchema = new mongoose.Schema({
  paperName: { type: String, required: true },
  quantity: { type: Number, required: true },
  printerName: { type: String, required: true },
  firmName: { type: String },
  moneyPaid: { type: Number, required: true },
  description: { type: String, default: "" },
  assignedOn: { type: Date, default: Date.now }
});

const AssignedPaper = mongoose.model("AssignedPaper", assignedPaperSchema);
module.exports = AssignedPaper;
