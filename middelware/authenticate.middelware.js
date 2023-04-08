const authenticateMiddelware = (req, res, next) =>{
    if(!req.user){
       return res.status(401).send('You are not authorized to access this page please login first');
    }
    next();
}

const checkUserCredit = (req, res, next) =>{
    if(!req.user.credit){
       return res.status(403).send('you dont have required credit');
    }
    next();
}

module.exports ={
    authenticateMiddelware,
    checkUserCredit
}