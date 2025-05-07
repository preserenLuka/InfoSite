const express = require("express");
const {
  getDatalist,
  getAllTopics,
  getTopicById,
  getContentById,
} = require("../controllers/getDataController");
const router = express.Router();

router.get("/datalist", getDatalist);
router.get("/getAllTopics", getAllTopics);
router.get("/topics/:id", getTopicById);
router.get("/contents/:id", getContentById);

module.exports = router;
