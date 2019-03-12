const saveData = require("./saveData/saveData");
const getData = require("./getData/getData");

const express = require('express');
const router = express.Router();

router.use("/saveData", saveData);
router.use("/getData", getData);


module.exports = router;