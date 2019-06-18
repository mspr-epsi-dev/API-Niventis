const express = require('express');

const app =  express();

app.set('env', 'production');

module.exports = app;
