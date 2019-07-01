const Pharmacie = require('../models/pharmacieModel/pharmacieModel');
const httpMessage = require('../init/httpMessages');
const pharmacieMockup = require('../test/pharmacieTest/pharmacieMockup.json');
const init = require("../init/init");
const request = require('request');
const util = require('./util');

const contentTypeJson = {"Content-Type": "application/json"};


module.exports = {


    /**
     * save pharmacie to database
     * @body JSON object following PharmacieSchema
     * @res express http response object
     * @return JSON object 
     */
    savePharmacie : (body, res) => {
        
        try {

            var bodyCorrespondingToSchema = true;
                                
            //check if the properties of the json object sent in req.body correspond to the entityMockup
            //if not : bodyCorrespondingToSchema => false
            for(var property in body){
                
                if( !pharmacieMockup.hasOwnProperty(property) ){
                    bodyCorrespondingToSchema = false;
                }
                
            }

            //if the resource sent if misfformed, status code 400 sent
            if(bodyCorrespondingToSchema == false){
                
                var msg = httpMessage["400"].missformedRessource;
                res.status(400, contentTypeJson).send({ message :msg });

            }else{
                
                var pharmacie = new Pharmacie(body);
        
                pharmacie.save((error, doc) => {
            
                    if(error){
            
                        if(error.name){

                            var msg = httpMessage["400"].missformedRessource;
                            res.status(400, contentTypeJson).send({message :msg});
                            
                        }
            
                    }else{

                        var msg = httpMessage["200"].saveSuccess;
                        res.status(200, contentTypeJson).send({message : msg, doc});

                    }
            
                });

            }
            
        } catch (error) {
            
            var msg = httpMessage["500"].somethingWrong;
            res.status(500, contentTypeJson).send( { message : msg } );
            console.log({error:{msg: error.message, stack: error.stack}});


        }
        
    },


    /**
     * send back all pharmacies in database
     * @res express http response object
     * @return Json object
     */
    getAllPharmacies : (res) => {

        try {
            
            Pharmacie.find({}, (error, doc) => {

                if(error){
        
                    var msg = httpMessage["500"].somethingWrong;
                    res.status(500, contentTypeJson).send( { message : msg } );
                    console.log({error:{msg: error.message, stack: error.stack}});
        
                }else{
                    
                    if(doc){
                        
                        res.status(200, contentTypeJson).send(doc)
                        
                    }else{
        
                        var msg = httpMessage["404"].pharmacieNotFound;
                        res.status(404, contentTypeJson).send({message :msg});
        
                    }
                }
        
            })

        } catch (error) {

            var msg = httpMessage["500"].somethingWrong;
            res.status(500, contentTypeJson).send( { message : msg } );
            console.log({error:{msg: error.message, stack: error.stack}});

        }

    },


    /**
     * send back the pharmacie targeted by the id 
     * @id String : id of the entity
     * @Return JSON object
     */
    getPharmacieById : (id, res) => {


        try {
            
            Pharmacie.findById(id, (error,doc) => {

                if(error){
    
                    var msg = httpMessage["400"].missformedId;
                    res.status(400, contentTypeJson).send({message :msg});
    
                }else{
    
                    if(doc){
    
                        res.status(200, contentTypeJson).send(doc);
    
                    }else{
    
                        var msg = httpMessage["404"].pharmacieNotFound;
                        res.status(404, contentTypeJson).send({message :msg});
    
                    }
    
                }
    
            });
            
        } catch (error) {

            var msg = httpMessage["500"].somethingWrong;
            res.status(500, contentTypeJson).send( { message : msg } );
            console.log({error:{msg: error.message, stack: error.stack}});        

        }
        
    },

    /**
    * update pharmacie targeted by the id 
    * @id id of the targeted entity to update
    * @return JSON object (updated entity)
    */
    updatePharmacie : (id, req, res) =>{

        try {
            
            //first check if the id exist on database
            Pharmacie.findById(id, (error,doc) => {

                if(error){

                    var msg = httpMessage["400"].missformedId;
                    res.status(400, contentTypeJson).send({message :msg});

                }else if(!doc){

                    var msg = httpMessage["404"].pharmacieNotFound;
                    res.status(404, contentTypeJson).send({message :msg});
                    
                } else {

                    //if the id exist, it's updated
                    Pharmacie.findOneAndUpdate(id, req.body,{new: true}, (error, doc) => {

                        if(error){
            
                            var msg = httpMessage["500"].somethingWrong;
                            res.status(500, contentTypeJson).send({message :msg});
            
                        } else {

                            var bodyCorrespondingToSchema = true;
                            
                            //check if the properties of the json object sent in req.body correspond to the pharmacieMockup
                            //if not : bodyCorrespondingToSchema => false
                            for(var property in req.body){
                                if( !pharmacieMockup.hasOwnProperty(property) ){

                                    bodyCorrespondingToSchema = false;

                                }
                                
                            }

                            if(bodyCorrespondingToSchema == false){

                                var msg = httpMessage["400"].missformedRessource;
                                res.status(400, contentTypeJson).send({ message :msg });

                            } else {

                                var msg = httpMessage["200"].updateSuccess;
                                res.status(200, contentTypeJson).send({message :msg, newDocument: doc});

                            }
                            
                        }
            
                    });

                }

            });

        } catch (error) {

            var msg = httpMessage["500"].somethingWrong;
            res.status(500, contentTypeJson).send( { message : msg } );
            console.log({error:{msg: error.message, stack: error.stack}});  
            
        }
    },

    /**
    * delete pharmacie targeted by the id
    * @id id of the targeted entity
    * @return JSON object (confirmation message)
    */
    deletePharmacie : (id, res) => {

        try {
            
            Pharmacie.findOneAndDelete({_id: id}, (error, doc) => {

                if(error) {
        
                    var msg = httpMessage["400"].missformedId;
                    res.status(400, contentTypeJson).send({message :msg, error : error});
        
                } else {
        
                    if(doc) { 
        
                        var msg = httpMessage["200"].deleteSucess;
                        res.status(200, contentTypeJson).send({message :msg});
        
                    } else {
        
                        var msg = httpMessage["404"].pharmacieNotFound;
                        res.status(404, contentTypeJson).send({message :msg});
        
                    }
        
                }
            });

        } catch (error) {
            
            var msg = httpMessage["500"].somethingWrong;
            res.status(500, contentTypeJson).send( { message : msg } );
            console.log({error:{msg: error.message, stack: error.stack}});  
            
        }

    },

    /**
     * query pharmacies around latt & long point, based on perimeter limit
     * @latt latt : lattitude
     * @long long: longitude
     * @perimter perimeter: limit perimeter of the research
     * @Return JSON array (pharmacies around)
     */
    locatePharmacie : (long, latt, perimeter, res) => {         

        try {            
    
            //verify if query params are provided
            if( long && latt ) {

                var hereApiUri = init.hereApiUri;
                var hereApiAppId = init.hereApiAppId;
                var hereApiAppCode = init.hereApiAppCode;
                var researchParam = latt + "," + long + ";r=" + perimeter;

                var url = hereApiUri + researchParam + "&app_id="+ hereApiAppId + "&app_code=" + hereApiAppCode

                request.get(url, (req, resp) => {

                    var parsedResponse = JSON.parse(resp.body);                    
                    var pharmaciesFounded = [];                   
                    
                    parsedResponse.results.forEach(pharmacyDetails => {

                        if(pharmacyDetails.vicinity !== undefined){

                            var newAddress = pharmacyDetails.vicinity.replace('<br/>', ' ');

                            var pharmacyFounded = {
                                name : pharmacyDetails.title,
                                address : newAddress,
                                distance : pharmacyDetails.distance
                            }

                        }

                        pharmaciesFounded.push(pharmacyFounded);

                    });

                    pharmaciesFounded.shift();
                    
                    res.send(pharmaciesFounded);
                    
                });

            } else {

                var msg = httpMessage["400"].incorrectQueryParam;
                res.status(400, contentTypeJson).send({message :msg});

            }

        } catch (error) {

            var msg = httpMessage["500"].somethingWrong;
            res.status(500, contentTypeJson).send( { message : msg } );
            console.log(error);
                        
        }

        

        
        
    }


}

    