const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../documentation/swagger.json');

const pharmacieRouter = require("./pharmacieRoutes");

router.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
router.use("/api", pharmacieRouter);


module.exports = router;