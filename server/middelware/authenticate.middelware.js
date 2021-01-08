const authenticateMiddelware = (req, res, next) =>{
    if(!req.user){
       return res.status(401).send('You are not authorized to access this page please login fir');
    }
    next();
}

module.exports ={
    authenticateMiddelware
}