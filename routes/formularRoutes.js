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

/**
 * get all formulars
 * GET request
 * @return Json object with all formulars in database
 */
router.get(routes.formular, (req, res) => {
    
    formular.getAllFormulars(res);

});

/**
 * get formular by id
 * GET request
 * @PathParameter id of the targeted formular
 * @Return JSON object with formular entity targeted
 */
router.get(routes.formular + "/:id", (req, res) => {
    
    var id = req.params.id;
    formular.getFormularById(id, res);

});

/**
 * update formular
 * PUT request
 * @PathParam id of the targeted formular to update
 * @return JSON object with the updated formular
 */
router.put(routes.formular + "/:id", (req, res) => {
    
    var id = req.params.id
    formular.updateFormular(id, req, res);

});

/**
 * delete formular
 * DELETE request
 * @PathParam id of the targeted entity to delete
 * @return JSON object with confirmation message
 */
router.delete(routes.formular + "/:id", (req,res) => {

    var id = req.params.id;
    formular.deleteFormular(id, res);

});



module.exports = router;