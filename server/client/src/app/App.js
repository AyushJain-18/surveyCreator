import React from 'react';
import HeaderCompoennt from '../components/header/Header.component';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import SurveyDashBoardCompoent from '../components/surveys/NewSurveyDashboard';
import HomeDashboard from '../components/home-component/home.component';
import FooterContact from '../components/footer/Footer.component';
import AddNewSurveysForm from '../components/surveys/add-new-survey/add-new-surveys-form';
import ErrorCompoennt  from '../components/custum-component/error/error.component';

import SurveyStepperContainer from '../components/surveys/Survey-stepper.container'



function App() {
  const errorMessage = 'Please check your internet connection and then try again';
  return (
    <>
      <HeaderCompoennt/>
      <Switch>
        <Route exact path='/' component={HomeDashboard}/>
        <Route exact path='/error' render={props => <ErrorCompoennt {...props} message={errorMessage} height={'89vh'} />}/>
        <Route exact path='/surveys' component={SurveyDashBoardCompoent}/>
        <Route exact path='/surveys/create-new-surveys' component={SurveyStepperContainer}/>
      </Switch>
      {/* <FooterContact/> */}
    </>
  );
}

export default App;
