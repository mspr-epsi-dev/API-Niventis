const express = require('express');
const database = require('./functions/databaseFunctions');
const router = require('./routes/router');

const app =  express();
const port = 3000

app.use("/", router);

database.connect();

app.listen(port, () => {
    
    console.log( "serveur launched, listening on port " + port );
    console.log("environment : " + app.settings.env);
    
});

//export app for testing purpose
module.exports = app;