import React from 'react';
import AddNewSurveysForm from './add-new-survey/add-new-surveys-form';
import StepperComponent from '../custum-component/stepper-component/stepper.component';

import ShowUserData from '../surveys/display-user-from-data/ShowUserFormdataComponent';
import {selectIsUserLogedIn} from '../../store/authReducers/auth.selector';

import {withRouter} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';

const SurveyStepperContainer = ({history, isUserLogedIn})=>{
  if(!isUserLogedIn){
    history.push('/');
  }
  return <StepperComponent 
    components={[<AddNewSurveysForm key='AddNewSurveysForm'/>,<ShowUserData key='ShowUserData'/>]}
    headerTitle={ ['Fill out survey creator form', 'Confirm form values']}
  />
};
const mapStateToPorops =state =>({
  isUserLogedIn: selectIsUserLogedIn(state)
})
export default compose(
  connect(mapStateToPorops),
  withRouter)(SurveyStepperContainer);