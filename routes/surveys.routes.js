const express = require('express');
const authMiddelware =
  require('../middelware/authenticate.middelware').authenticateMiddelware;
const checkUserCredit =
  require('../middelware/authenticate.middelware').checkUserCredit;
const sendMail = require('../services/nodemailer');

const User = require('../model/user.model');
const Survey = require('../model/surveys.model');

const Routes = express.Router();

const construstSurveyReciverObjectForNodeMailler = (recipientList) => {
  return recipientList.map((eachRecipeint) => ({
    mail: String(eachRecipeint).trim(),
  }));
};

const construstSurveyReciverArray = (recipientList) => {
  return recipientList.map((eachRecipeint) => ({
    email: String(eachRecipeint).trim(),
    response: false,
  }));
};

const getUserIdFromUserProfileId = async (profileID) => {
  try {
    let user = await User.findOne({ profile_id: profileID });
    return user;
  } catch (error) {
    console.log('//Errro// while fetching users data', error.message);
    return res.status(430).send('User details cannot be fetched');
  }
};

Routes.post(
  '/api/generateSurvey',
  authMiddelware,
  checkUserCredit,
  async (req, res) => {
    // SAMPLE BODY DATA ----------------------------------------->

    // { surveyData:
    //     { title: 'My first survey',
    //       subject: 'Do you like our service',
    //       body: 'Hi buddy , show us some love ',
    //       recipientList: 'ayush.ayushjain12@gmail.com,ishu11jain@gmail.com' },
    //    user_profile_id: '108674530653786194347' }

    //sendMail(array of recipeints, sender's objecct, {emailBody, emailSubject}

    // ----------------------------------------->
    let user = await getUserIdFromUserProfileId(req.body.user_profile_id);
    let recipientList = construstSurveyReciverObjectForNodeMailler(
      req.body.surveyData.recipientList
    );
    let userCredit = user.credit;
    let userdata;
    let surveyObject = {
      user: user._id,
      title: req.body.surveyData.title,
      body: req.body.surveyData.body,
      subject: req.body.surveyData.subject,
      recipents: construstSurveyReciverArray(req.body.surveyData.recipientList),
    };
    try {
      let survey = await Survey.create(surveyObject);
      let response = await sendMail(
        recipientList,
        { id: survey._id, mail: req.body.senderMail },
        req.body.surveyData
      );
      userdata = await User.findByIdAndUpdate(user._id, {
        credit: userCredit - 1,
      });
      console.log('response from node mailer', response);
    } catch (error) {
      console.log(
        '//Errro occured// while adding data to survey',
        error.message
      );
      return res.status(430).send('error');
    }
    res.send({ userCredit: userdata.credit });
  }
);

Routes.post('/api/getSurvey', authMiddelware, async (req, res) => {
  let userId = req.body.user_id;
  let surveyData = await Survey.find({ user: userId });
  res.send(surveyData);
});

Routes.post('/api/sureyResponse', async (req, res) => {
  console.log(req.body);
  try {
    let { surveyGeneratorId, reciverMailId, response } = req.body;
    let survey = await Survey.findById(surveyGeneratorId);
    let recipeintIndex = null;
    console.log('Survey recipients', survey.recipents);
    survey.recipents.map((recipent, index) => {
      console.log(
        '1.inside map',
        recipent.email,
        reciverMailId,
        recipent.response
      );
      if (recipent.email === reciverMailId && !recipent.response) {
        console.log(
          '2.inside map',
          recipent.email,
          reciverMailId,
          recipent.response
        );
        recipeintIndex = index;
      }
    });
    if (recipeintIndex !== null) {
      console.log('recipientIndex', recipeintIndex);
      survey.recipents[recipeintIndex].response = true;
      response === 'Yes'
        ? (survey.TotalYes = survey.TotalYes + 1)
        : (survey.TotalNo = survey.TotalNo + 1);
      let newSurvey = await survey.save();
      console.log('newSurvey', newSurvey);
      return res.send({ result: 'Response Successfully submitted' });
    } else {
      return res.send({ result: 'You have already submitted your response' });
    }
  } catch (error) {
    console.log(
      '//Error occured// while updating survey response Surveys',
      error.message
    );
    return res
      .status(500)
      .send({ survey: 'Error, while submitting your response' });
  }
});

module.exports = Routes;
