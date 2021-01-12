import React from 'react';
import AddNewSurveysForm from './add-new-survey/add-new-surveys-form';
import StepperComponent from '../custum-component/stepper-component/stepper.component';

import ShowUserData from '../surveys/display-user-from-data/ShowUserFormdataComponent';

const SurveyStepperContainer = ()=>{
    return <StepperComponent 
                components={[<AddNewSurveysForm/>,<ShowUserData/>]}
                 headerTitle={ ['Fill out survey creator form', 'Confirm form values']}
            />
};

export default SurveyStepperContainer;