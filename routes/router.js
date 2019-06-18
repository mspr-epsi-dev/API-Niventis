const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../documentation/swagger.json');

const pharmacieRouter = require('./pharmacieRoutes');
const formularRouter = require('./formularRoutes');

router.get('/', function(req, res) {
	res.send('hello world');
}); 
router.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
router.use("/api", pharmacieRouter);
router.use("/api", formularRouter);


module.exports = router;
