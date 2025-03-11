const Paper = require("../models/Paper");


exports.createPaper = async (req, res) => {
  try {
    const { paperName, quantity, description } = req.body;

    if (!paperName || !quantity || quantity <= 0 || !description) {
      return res.status(400).json({ message: "All fields are required with a valid quantity." });
    }

    const existingPaper = await Paper.findOne({ paperName });
    if (existingPaper) {
      return res.status(400).json({ message: "Paper already exists. Use update instead." });
    }

    const newPaper = new Paper({
      paperName,
      initialQuantity: quantity,
      quantity, 
      description,
      history: [], 
    });

    await newPaper.save();
    res.status(201).json(newPaper);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getPapers = async (req, res) => {
  try {
    const papers = await Paper.find();
    res.status(200).json(papers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePaperByName = async (req, res) => {
  try {
    const { name } = req.params;
    const paper = await Paper.findOneAndDelete({ paperName: name });

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    res.status(200).json({ message: "Paper deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting paper", error: err.message });
  }
};

exports.updatePaperByName = async (req, res) => {
  try {
    const { name } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity provided" });
    }

    const paper = await Paper.findOne({ paperName: name });

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    const newEntry = { quantity, updatedOn: new Date() };
    paper.history.push(newEntry);

    paper.quantity += quantity;

    await paper.save();
    res.json({ message: "Paper updated successfully", data: paper });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};



