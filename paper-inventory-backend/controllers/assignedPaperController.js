const AssignedPaper = require("../models/AssignedPaper");
const Paper = require("../models/Paper");

exports.assignPaper = async (req, res) => {
  try {
    const { paperName, quantity, printerName, firmName, moneyPaid, description } = req.body;

    if (!paperName || !quantity || !printerName || moneyPaid === undefined || moneyPaid === null || moneyPaid === "") {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const paperDescription = description || "No description provided";

    const paper = await Paper.findOne({ paperName });
    if (!paper) {
      return res.status(400).json({ message: "Paper not found" });
    }

    if (paper.quantity < quantity) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    paper.quantity -= quantity;
    await paper.save();

    const newAssignedPaper = new AssignedPaper({
      paperName,
      quantity,
      printerName,
      firmName,
      moneyPaid,
      description: paperDescription  
    });

    await newAssignedPaper.save();
    res.status(201).json({ message: "Paper assigned successfully", data: newAssignedPaper });

  } catch (err) {
    res.status(500).json({ message: "Error assigning paper", error: err.message });
  }
};



// Get all assigned papers
exports.getAssignedPapers = async (req, res) => {
    try {
      const assignedPapers = await AssignedPaper.find(); // No populate needed
      res.status(200).json(assignedPapers);
    } catch (err) {
      res.status(500).json({ message: "Error fetching assigned papers", error: err.message });
    }
  };
  ;
  
// Delete assigned paper by paper name
exports.deleteAssignedPaper = async (req, res) => {
    try {
      const { paperName } = req.params;
  
      const deletedPaper = await AssignedPaper.findOneAndDelete({ paperName });
  
      if (!deletedPaper) {
        return res.status(404).json({ message: "Assigned paper not found" });
      }
  
      res.status(200).json({ message: "Assigned paper deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting assigned paper", error: err.message });
    }
  };

//Update assigned paper by Name
// exports.updateAssignedPaper = async (req, res) => {
//   try {
//     const { paperName } = req.params; // Get old paper name
//     const { newQuantity } = req.body; // New quantity

//     // Find the assigned paper
//     const existingAssignedPaper = await AssignedPaper.findOne({ paperName });
//     if (!existingAssignedPaper) {
//       return res.status(404).json({ message: "Assigned paper not found" });
//     }

//     const oldQuantity = existingAssignedPaper.quantity; // Previous quantity

//     // Find the available stock
//     const availablePaper = await Paper.findOne({ paperName });
//     if (!availablePaper) {
//       return res.status(404).json({ message: "Available paper not found" });
//     }

//     // Update the available stock (Adjust based on the quantity change)
//     const quantityDifference = newQuantity - oldQuantity;
//     availablePaper.quantity -= quantityDifference; // Reduce or increase available stock

//     // Ensure stock does not go negative
//     if (availablePaper.quantity < 0) {
//       return res.status(400).json({ message: "Not enough stock available" });
//     }

//     // Save updated available paper stock
//     await availablePaper.save();

//     // Update assigned paper quantity
//     existingAssignedPaper.quantity = newQuantity;
//     await existingAssignedPaper.save();

//     res.status(200).json({ message: "Assigned paper updated successfully", data: existingAssignedPaper });
//   } catch (err) {
//     res.status(500).json({ message: "Error updating assigned paper", error: err.message });
//   }
// };
