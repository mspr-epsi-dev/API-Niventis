const express = require('express');
const database = require('./functions/databaseFunctions');

const app =  express();
const port = 3000

database.connect();

app.listen(port, () => {
    
    console.log( "serveur launched, listening on port " + port );
    console.log("environment : " + app.settings.env);
    
});

//export app for testing purpose
module.exports = app;