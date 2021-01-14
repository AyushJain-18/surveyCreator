const express = require('express');
const authMiddelware = require('../middelware/authenticate.middelware').authenticateMiddelware;
const checkUserCredit = require('../middelware/authenticate.middelware').checkUserCredit;
const sendMail = require('../services/nodemailer');

const User      = require('../model/user.model');
const Survey    = require('../model/surveys.model');

const Routes = express.Router();

const construstSurveyReciverObjectForNodeMailler = (recipientList) =>{
   return  recipientList.map(eachRecipeint => ({mail: String(eachRecipeint).trim()}))
}

const construstSurveyReciverArray = (recipientList) =>{
    return  recipientList.map(eachRecipeint => (
            {
                email: String(eachRecipeint).trim(),
                response: false
            }
        ))
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
    // SAMPLE BODY DATA ----------------------------------------->

            // { surveyData:
            //     { title: 'My first survey',
            //       subject: 'Do you like our service',
            //       body: 'Hi buddy , show us some love ',
            //       recipientList: 'ayush.ayushjain12@gmail.com,ishu11jain@gmail.com' },
            //    user_profile_id: '108674530653786194347' }


     //sendMail(array of recipeints, sender's objecct, {emailBody, emailSubject} 

    // ----------------------------------------->
    let userID          = await getUserIdFromUserProfileId(req.body.user_profile_id);
    let recipientList   = construstSurveyReciverObjectForNodeMailler(req.body.surveyData.recipientList);
    
    let surveyObject ={
        user      : userID,
        title     : req.body.surveyData.title,
        body      : req.body.surveyData.body,
        subject   : req.body.surveyData.subject,
        recipents : construstSurveyReciverArray(req.body.surveyData.recipientList),
    }
    try{
        let survey = await Survey.create(surveyObject);
        console.log('Survey is ', survey);
        let response = await sendMail(recipientList, {id: userID, mail:req.body.senderMail},req.body.surveyData);
        console.log('//SUCCESS// sending mail', response);
    }catch(error){
        console.log('//Errro occured// while adding data to survey', error.message);
        return res.status(430).send();
    }
    res.send();
})

Routes.get('/hello', (req,res) => {
    getUserIdFromUserProfileId('108674530653786194347');
    res.send('success')
})


module.exports = Routes;