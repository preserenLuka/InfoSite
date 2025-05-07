const express = require("express");
const {
  createContent,
  updateContent,
  deleteContent,
} = require("../controllers/contentsController");

const router = express.Router();

router.post("/contents", createContent);
router.put("/contents/:id", updateContent);
router.delete("/contents/:id", deleteContent);

module.exports = router;
