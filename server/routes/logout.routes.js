const express = require('express');
const Routes  = express.Router();


Routes.get('/api/logout', (req, res)=>{
    req.logout();
    res.redirect(process.env.CLIENT_APP_ROUTES+'/surveys')
})

module.exports = Routes;