const Formular = require('../models/formularModel/formularModel');
const httpMessage = require('../init/httpMessages');
const formularMockup = require('../test/formularTest/formularMockup');
const contentTypeJson = {"Content-Type": "application/json"};

module.exports = {

    /**
     * save formular to database
     * @body JSON object following FormularSchema
     * @res express http response object
     * @return JSON object 
     */
    saveFormular : (body, res) => {
        
        try {
    
            var formular = new Formular(body);

            formular.save((error, doc) => {                

                if(error){
        
                    if(error.name){

                        var msg = httpMessage["400"].missformedRessource;
                        res.status(400, contentTypeJson).send({message :msg});
                        
                    }
        
                }else{

                    var msg = httpMessage["200"].saveFormularSucess;
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
     * send back all formulars saved in database
     * @res express http response object
     * @return Json object
     */
    getAllFormulars : (res) => {

        try {
            
            Formular.find({}, (error, doc) => {

                if(error){
        
                    var msg = httpMessage["500"].somethingWrong;
                    res.status(500, contentTypeJson).send( { message : msg } );
                    console.log({error:{msg: error.message, stack: error.stack}});
        
                }else{
                    
                    if(doc){
                        
                        res.status(200, contentTypeJson).send(doc)
                        
                    }else{
        
                        var msg = httpMessage["404"].formularNotFound;
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
    * send back the formular targeted by the id 
    * @id String : id of the entity
    * @Return JSON object
    */
    getFormularById : (id, res) => {


        try {
            
            Formular.findById(id, (error,doc) => {

                if(error){
    
                    var msg = httpMessage["400"].missformedId;
                    res.status(400, contentTypeJson).send({message :msg});
    
                }else{
    
                    if(doc){
    
                        res.status(200, contentTypeJson).send(doc);
    
                    }else{
    
                        var msg = httpMessage["404"].formularNotFound;
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
    * delete formular targeted by the id
    * @id id of the targeted entity
    * @return JSON object (confirmation message)
    */
   deleteFormular : (id, res) => {

    try {
        
        Formular.findOneAndDelete({_id: id}, (error, doc) => {

            if(error) {
    
                var msg = httpMessage["400"].missformedId;
                res.status(400, contentTypeJson).send({message :msg, error : error});
    
            } else {
    
                if(doc) { 
    
                    var msg = httpMessage["200"].deleteFormularSuccess;
                    res.status(200, contentTypeJson).send({message :msg});
    
                } else {
    
                    var msg = httpMessage["404"].formularNotFound;
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

}