const express = require('express');
const router = express.Router();

const pharmacieRoute = require("./pharmacieRoute");

router.use("/pharmacie", pharmacieRoute);


module.exports = router;