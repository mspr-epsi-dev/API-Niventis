const init = require('../init/init');
const mongoose = require('mongoose');

module.exports = {

    /**
     * @mongoUrl String => url of the mongo database to connect to
     */
    connect : () => {

        //choose the right mongo url when on production or development mode
        var mongoUrl="";

        if(process.env.NODE_ENV === 'production'){

            mongoUrl = init.mongodbProd;

        }else{

            mongoUrl = init.mongodbDev;

        }
        

        mongoose.connect(mongoUrl, {useNewUrlParser: true});
        
        console.log("trying to connect on : " + mongoUrl);

        mongoose.Promise = global.Promise;

        mongoose.connection.once('open', ()=>{
        
            const msg = "Connection to " + mongoUrl + " have been succesfully made";
            console.log(msg);
            
        }).on('error', (error)=>{
        
            console.log("connection error : " + error);

        });

    },

}

