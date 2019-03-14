const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
    
    res.send({hello: "hello"});

});

module.exports = router;