const Pharmacie = require('../models/pharmacieModel');
const httpMessage = require('./httpMessages');
const pharmacieMockup = require('../test/pharmacieMockup.json')
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

            var pharmacie = new Pharmacie(body);
        
            pharmacie.save((err, doc) => {
        
                if(err){
        
                    if(err.name){

                        var msg = httpMessage["400"].missformedRessource;
                        res.status(400, contentTypeJson).send({message :msg});
                        
                    }
        
                }else{

                    var msg = httpMessage["200"].saveSuccess;
                    res.status(200, contentTypeJson).send({message : msg, doc});
        
                }
        
            });

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
            
            Pharmacie.findById(id, (err,doc) => {

                if(err){
    
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
            Pharmacie.findById(id, (err,doc) => {

                if(err){

                    var msg = httpMessage["400"].missformedId;
                    res.status(400, contentTypeJson).send({message :msg});

                }else if(!doc){

                    var msg = httpMessage["404"].pharmacieNotFound;
                    res.status(404, contentTypeJson).send({message :msg});
                    
                } else {

                    //if the id exist, it's updated
                    Pharmacie.findOneAndUpdate(id, req.body,{new: true}, (err, doc) => {

                        if(err){
            
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
            
            Pharmacie.findOneAndDelete({_id: id}, (err, doc) =>{

                if(err){
        
                    var msg = httpMessage["400"].missformedId;
                    res.status(400, contentTypeJson).send({message :msg, error : err});
        
                }else{
        
                    if(doc){
        
                        var msg = httpMessage["200"].deleteSucess;
                        res.status(200, contentTypeJson).send({message :msg});
        
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

    }


}

    