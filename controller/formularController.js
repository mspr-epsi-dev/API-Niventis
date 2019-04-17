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

                    var msg = httpMessage["200"].saveSuccess;
                    res.status(200, contentTypeJson).send({message : msg, doc});
        
                }
        
            });

        } catch (error) {
            
            var msg = httpMessage["500"].somethingWrong;
            res.status(500, contentTypeJson).send( { message : msg } );
            console.log({error:{msg: error.message, stack: error.stack}});


        }
        
    }

}