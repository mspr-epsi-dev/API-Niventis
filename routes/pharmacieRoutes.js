const express = require('express');
const router = express.Router();
const routes = require('../init/routes');
const pharmacie = require('../controller/pharmacieController');

/**
 * save pharmacie
 * POST request
 * @body (req.body) : JSON object
 * @return JSON object 
 */
router.post(routes.pharmacies, (req, res) => {
   
    var body = req.body;
    pharmacie.savePharmacie(body, res);

});

/**
 * get all pharmacies
 * GET request
 * @return Json object with all pharmacies in database
 */
router.get(routes.pharmacies, (req, res) => {
    
    pharmacie.getAllPharmacies(res);

});

/**
 * get pharmacie by id
 * GET request
 * @PathParameter id of the targeted pharmacie
 * @Return JSON object with pharmacie entity targeted
 */
router.get(routes.pharmacies + "/:id", (req, res) => {
    
    var id = req.params.id;
    pharmacie.getPharmacieById(id, res);

});

/**
 * update pharmacie
 * PUT request
 * @PathParam id of the targeted entity to update
 * @return JSON object with the updated entity
 */
router.put(routes.pharmacies + "/:id", (req, res) => {

    var id = req.params.id
    pharmacie.updatePharmacie(id, req, res);

})

/**
 * delete pharmacie
 * DELETE request
 * @PathParam id of the targeted entity to delete
 * @return JSON object with confirmation message
 */
router.delete(routes.pharmacies + "/:id", (req,res) => {

    var id = req.params.id;
    pharmacie.deletePharmacie(id, res);

});

/**
 * search pharmacies around latt & long point, based on perimeter limit
 * GET request
 * @QueryParam latt : lattitude
 * @QueryParam long: longitude
 * @QueryParam perimeter: limit perimeter of the research
 * @Return JSON array of pharmacies around
 */
router.get("/localisation", (req, res) => {
    
    var long = parseFloat(req.query.long);
    var latt = parseFloat(req.query.latt);
    var perimeter = req.query.perim;

    pharmacie.locatePharmacie(long, latt, perimeter, res);

});

module.exports = router;