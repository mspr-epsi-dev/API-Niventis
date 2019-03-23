const express = require('express');
const router = express.Router();

const pharmacieRouter = require("./pharmacieRouter");

router.use("/pharmacie", pharmacieRouter);


module.exports = router;