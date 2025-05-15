const express = require("express");
const { createTopic } = require("../controllers/postDataController");
const router = express.Router();

// Route to create a new topic
router.post("/topics", createTopic);

module.exports = router;
