const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send({ response: "Backend Server is running." }).status(200);
});

module.exports = router;