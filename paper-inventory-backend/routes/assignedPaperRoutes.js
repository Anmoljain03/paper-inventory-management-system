const express = require("express");
const router = express.Router();
const assignedPaperController = require("../controllers/assignedPaperController");

// Route to assign paper to a printer
router.post("/assign", assignedPaperController.assignPaper);

// Route to get all assigned papers
router.get("/", assignedPaperController.getAssignedPapers);

// Update assigned paper by Name 
// router.put("/assigned/name/:paperName", assignedPaperController.updateAssignedPaper);

// Route to delete an assigned paper by name
router.delete("/assigned/:paperName", assignedPaperController.deleteAssignedPaper);

module.exports = router;
