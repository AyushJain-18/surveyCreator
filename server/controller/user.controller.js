const User              = require('../model/user.model'); 

let isUserExist = async(keyName, value) =>{
    try{
        let user =   await User.findOne({[keyName]: value});
        console.log('User exist', user);
        return user;
    }catch(error){
        console.log('//Error// \n error while checking usrer existance');
    }

}
let cretaeNewUser = async (keyName, value)=>{
    try{
        let user = await User.create({[keyName]: value});
        console.log('User created', user);
        return user;
    }catch(error){
        console.log('//Error// \n error while creating new user');
    }

}
let findUserByID = async(id) =>{
   let user =  await User.findById(id);
   console.log('Find by ID User is', user);
   return user;
}
//{ profile_id: profile.id}



module.exports ={
    isUserExist,
    cretaeNewUser,
    findUserByID
}