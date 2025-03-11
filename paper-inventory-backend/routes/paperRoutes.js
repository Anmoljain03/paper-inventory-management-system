const express = require("express");
const { 
  createPaper, 
  getPapers, 
  deletePaperByName, 
  updatePaperByName 
} = require("../controllers/paperController");

const router = express.Router();

router.post("/", createPaper);
router.get("/", getPapers);
router.delete("/:name", deletePaperByName);
router.put("/:name", updatePaperByName); 

module.exports = router;
