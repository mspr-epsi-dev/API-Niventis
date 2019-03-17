const express = require('express');
const router = express.Router();

const saveData = require("./saveData/saveData");
const getData = require("./getData/getData");

router.use("/saveData", saveData);
router.use("/getData", getData);


module.exports = router;