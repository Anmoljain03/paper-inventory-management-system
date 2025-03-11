const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema(
  {
    paperName: { type: String, required: true, unique: true },
    initialQuantity: { type: Number, required: true }, 
    quantity: { type: Number, default: 0, required: true }, 
    description: { type: String, required: true },
    history: [
      {
        quantity: Number,
        updatedOn: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true } 
);

const Paper = mongoose.model("Paper", paperSchema);
module.exports = Paper;
