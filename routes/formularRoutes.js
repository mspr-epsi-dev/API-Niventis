const express = require('express');
const router = express.Router();
const routes = require('../init/routes');
const formular = require('../controller/formularController');

/**
 * save formular
 * POST request
 * @body (req.body) : JSON object
 * @return JSON object 
 */
router.post(routes.formular, (req, res) => {
   
    var body = req.body;
    formular.saveFormular(body, res);

});