const express = require('express');
const authMiddelware = require('../middelware/authenticate.middelware').authenticateMiddelware;
const checkUserCredit = require('../middelware/authenticate.middelware').checkUserCredit;
const sendMail = require('../services/nodemailer');

const User = require('../model/user.model');


const Routes = express.Router();

const construstSurveyReciverObject = (recipientList) =>{
   return  recipientList.map(eachRecipeint => ({mail: String(eachRecipeint).trim()}))
}

const getUserIdFromUserProfileId = async (profileID) =>{
    try{
      let user = await User.findOne({profile_id:profileID});
      return user._id;
    }catch(error){
        console.log('//Errro// while fetching users data', error.message);
        return res.status(430).send();
    }
}

Routes.post('/api/generateSurvey',authMiddelware, checkUserCredit, async (req,res) =>{
    let userID = getUserIdFromUserProfileId(req.body.user_profile_id)
    // SAMPLE BODY DATA ----------------------------------------->

            // { surveyData:
            //     { title: 'My first survey',
            //       subject: 'Do you like our service',
            //       body: 'Hi buddy , show us some love ',
            //       recipientList: 'ayush.ayushjain12@gmail.com,ishu11jain@gmail.com' },
            //    user_profile_id: '108674530653786194347' }

    // ----------------------------------------->


    let recipientList = construstSurveyReciverObject(req.body.surveyData.recipientList);
    //sendMail(array of recipeints, sender's objecct, {emailBody, emailSubject} )
    try{
        let response = await sendMail(recipientList, {id: userID, mail:req.body.senderMail},req.body.surveyData);
        console.log('//SUCCESS// sending mail', response);
    }catch(error){
        console.log('//Errro// while sending mails to users', error.message);
        return res.status(430).send();
    }
    res.send();
})

Routes.get('/hello', (req,res) => {
    getUserIdFromUserProfileId('108674530653786194347');
    res.send('success')
})


module.exports = Routes;