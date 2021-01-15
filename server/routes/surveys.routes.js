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
      return user;
    }catch(error){
        console.log('//Errro// while fetching users data', error.message);
        return res.status(430).send('User details cannot be fetched');
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
    let user            = await getUserIdFromUserProfileId(req.body.user_profile_id);
    let recipientList   = construstSurveyReciverObjectForNodeMailler(req.body.surveyData.recipientList);
    let userCredit      = user.credit;
    let userdata; 
    let surveyObject ={
        user      : user._id,
        title     : req.body.surveyData.title,
        body      : req.body.surveyData.body,
        subject   : req.body.surveyData.subject,
        recipents : construstSurveyReciverArray(req.body.surveyData.recipientList),
    }
    try{
        let survey   = await Survey.create(surveyObject);
        let response = await sendMail(recipientList, {id: survey._id, mail:req.body.senderMail},req.body.surveyData);
        userdata = await User.findByIdAndUpdate( user._id, {credit: (userCredit -1)});
        console.log('User value is',);
    }catch(error){
        console.log('//Errro occured// while adding data to survey', error.message);
        return res.status(430).send('error');
    }
    res.send({userCredit: userdata.credit});
})

Routes.post('/api/sureyResponse',async (req,res) => {
    console.log(req.body);
    try{    
          let survey    =  await Survey.findById(req.body.surveyGeneratorId);
          let recipients = survey.recipents;
          console.log('recipeint value is',recipients);
          let user      =  recipients.map(recipent =>{
            if(recipent.email === req.body.reciverMailId && !recipent.response ){
                    return {
                        _id: recipent._id,
                        email: recipent.email,
                        response: true
                    }
            }
            return  recipent;
          });
          console.log('User value is',user);
    }catch(error){
        console.log('//Errro occured// while fetching data from Surveys', error.message);
    }
    res.send(req.body);
})

Routes.post('/api/getSurvey',authMiddelware, async(req,res)=>{
        let userId = req.body.user_id;
        let surveyData = await Survey.find({user:userId});
        res.send(surveyData);
})


module.exports = Routes;