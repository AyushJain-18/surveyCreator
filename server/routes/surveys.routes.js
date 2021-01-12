const express = require('express');
const authMiddelware = require('../middelware/authenticate.middelware').authenticateMiddelware;
const checkUserCredit = require('../middelware/authenticate.middelware').checkUserCredit;

const Routes = express.Router();

Routes.post('/api/newSurveys', authMiddelware, checkUserCredi, (req,res) =>{
    req.body
})