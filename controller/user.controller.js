const User              = require('../model/user.model'); 

let isUserExist = async(keyName, value) =>{
    try{
        let user =   await User.findOne({[keyName]: value});
        return user;
    }catch(error){
        console.log('//Error// \n error while checking usrer existance');
    }

}
let cretaeNewUser = async (userData)=>{
    try{
        let user = await User.create({...userData});
        return user;
    }catch(error){
        console.log('//Error// \n error while creating new user');
    }

}
let findUserByID = async(id) =>{
   let user =  await User.findById(id);
   return user;
}
//{ profile_id: profile.id}



module.exports ={
    isUserExist,
    cretaeNewUser,
    findUserByID
}