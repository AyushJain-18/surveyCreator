import React from 'react';
import HeaderCompoennt from '../components/header/Header.component';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import SurveyDashBoardCompoent from '../components/surveys/NewSurveyDashboard';
import HomeDashboard from '../components/home-component/home.component';
import FooterContact from '../components/footer/Footer.component';
import UserResponse from '../components/user-response/UserResponse.component';
import ErrorCompoennt  from '../components/custum-component/error/error.component';
import UserProfile  from '../components/profile/user-profile.component'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import SurveyStepperContainer from '../components/surveys/Survey-stepper.container'

const font =  "'Yusei Magic', sans-serif";
const theme = createMuiTheme({
  typography: {
    fontFamily: font
  }
});

function App() {
  const errorMessage = 'Please check your internet connection and then try again';
  return (
    <ThemeProvider theme={theme}>
      <HeaderCompoennt/>
      <Switch>
        <Route exact path='/' component={HomeDashboard}/>
        <Route exact path='/error' render={props => <ErrorCompoennt {...props} message={errorMessage} height={'89vh'} />}/>
        <Route exact path='/profile' component={UserProfile}/>
        <Route exact path='/surveys' component={SurveyDashBoardCompoent}/>
        <Route exact path='/SurveyResponse' component={UserResponse}/>
        <Route exact path='/surveys/create-new-surveys' component={SurveyStepperContainer}/>
      </Switch>
      {/* <FooterContact/> */}
    </ThemeProvider>
  );
}

// SurveyResponse

export default App;
