const express = require('express');
const router = express.Router();
const route = require('../init/routes');
const pharmacie = require('../controller/pharmacieController');

/**
 * save pharmacie
 * POST request
 * @body (req.body) : JSON object
 * @return JSON object 
 */
router.post(route.pharmacies, (req, res) => {
   
    var body = req.body;
    pharmacie.savePharmacie(body, res);

});

/**
 * get all pharmacies
 * GET request
 * @return Json object with all pharmacies in database
 */
router.get(route.pharmacies, (req, res) => {
    
    pharmacie.getAllPharmacies(res);

});

/**
 * get pharmacie by id
 * GET request
 * @PathParameter id of the targeted pharmacie
 * @Return JSON object with pharmacie entity targeted
 */
router.get(route.pharmacies + "/:id", (req, res) => {
    
    var id = req.params.id;
    pharmacie.getPharmacieById(id, res);

});

/**
 * update pharmacie
 * PUT request
 * @PathParam id of the targeted entity to update
 * @return JSON object with the updated entity
 */
router.put(route.pharmacies + "/:id", (req, res) => {

    var id = req.params.id
    pharmacie.updatePharmacie(id, req, res);

})

/**
 * delete pharmacie
 * DELETE request
 * @PathParam id of the targeted entity to delete
 * @return JSON object with confirmation message
 */
router.delete(route.pharmacies + "/:id", (req,res) => {

    var id = req.params.id;
    pharmacie.deletePharmacie(id, res);

});

module.exports = router;