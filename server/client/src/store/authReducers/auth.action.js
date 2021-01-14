import errorLogger, {ERROR_AUTH_MESSAGE} from '../../utils/error.logger';
import SERVER_URL from '../../utils/server';
import authTypes from './auth.actiontypes';
import axios from 'axios';

// user login details fetching 
export const startFetchingUserLoginDetails  =() =>({
    type:  authTypes.START_FETCHING_USER_LOGIN_DETAILS
})

export const successfullyFetchedUserLoginDetails =(userData) =>({
    type        :  authTypes.SUCCESS_FETCHING_USER_LOGIN_DETAILS,
    payload     : userData
})

export const errorInFetchingUserLoginDetails =() =>({
    type:  authTypes.ERROR_FETCHING_USER_LOGIN_DETAILS
})

// user login actions
export const startUserLogIn  =() =>({
    type:  authTypes.START_USER_LOGIN
})

export const userLogInSuccess  =(userData) =>({
    type        :  authTypes.SUCCESS_USER_LOGIN,
    payload     : userData
})

export const userLogInFailure  =() =>({
    type:  authTypes.ERROR_USER_LOGIN
})

// user logout actions
export const startUserLogout  =() =>({
    type:  authTypes.SUCCESS_USER_LOGOUT
})

export const userLogoutSuccess  =() =>({
    type        :  authTypes.SUCCESS_USER_LOGOUT,
})

export const userLogoutFailure  =() =>({
    type:  authTypes.ERROR_USER_LOGOUT
})


// USER Credit operation 

export const startAddingCredit  =() =>({
    type:  authTypes.START_ADDING_CREDIT
})

export const SuccessAddingCredit =() =>({
    type        :  authTypes.SUCCESS_ADDING_CREDIT,
})

export const errorAddingCredit  =() =>({
    type:  authTypes.ERROR_ADDING_CREDIT
})
// ---------Survey form data actions------------------//

export const addSurveyFormDataToReducer  =(formData) =>{
    console.log('formData', formData);
    return {
        type    :  authTypes.ADD_SURVEY_FORM_DATA,
        payload :  formData
    }
}
export const clearSurveyFormDataFromReducer  =() =>({
    type:  authTypes.CLEAR_SURVEY_FORM_DATA
})

export const startGeneratingSurvey  =() =>({
    type:  authTypes.START_GENERATING_SURVEY
})
export const successGeneratingSurvey  =() =>({
    type:  authTypes.SUCCESS_GENERATING_SURVEY
})
export const errorGeneratingSurvey  =() =>({
    type:  authTypes.ERROR_GENERATING_SURVEY
})
export const resetSurveyStatus =() =>({
    type:  authTypes.RESET_SURVEY_STATUS
})
// -------------ADDING SURVEY RESPONSE TO DB ----------------------//
export const startAddingSurveyResponse =() =>({
    type:  authTypes.START_CAPTURING_SURVEY_RESPONSE
})
export const successAddingSurveyResponse  =() =>({
    type:  authTypes.SUCCESS_CAPTURING_SURVEY_RESPONSE
})
export const errorAddingSurveyResponse  =() =>({
    type:  authTypes.ERROR_CAPTURING_SURVEY_RESPONSE
})


// --------------Assonchronous action creator ------------- //

export const startFetchingUserLoginDetailsAsync = ()=>{
    return async (dispatch) => {
        dispatch(startFetchingUserLoginDetails());
        try{
            let response = await axios.get(`/api/getCurrentUser`);
            dispatch(successfullyFetchedUserLoginDetails(response.data));
            dispatch(clearSurveyFormDataFromReducer());
        } catch(error){
                if(error.message === ERROR_AUTH_MESSAGE){
                    dispatch(successfullyFetchedUserLoginDetails(null));
                    return;
                }
            errorLogger(error, 'Error occored while fetching user login details');
            dispatch(errorInFetchingUserLoginDetails())
        }
    }
}

export const startAddingCreditsAsync =(token, amount)=>{
    return async dispatch => {
        dispatch(startAddingCredit());
        try{
            let response = await axios.post('/api/addCredit',{token, amount: amount }); 
            console.log('Add Credit Response is', response);
            dispatch(startFetchingUserLoginDetailsAsync());
        } catch(error){
            errorLogger(error, 'Error occored while Adding new Credits');
            dispatch(errorAddingCredit())
        }
    
    } 

}

export const startUserLogoutAsync = ()=>{
    return async (dispatch) => {
        dispatch(startUserLogout());
        try{
            let response = await axios.get('/auth/google');
            console.log('Login response is',response);
            dispatch(userLogoutSuccess());
            dispatch(clearSurveyFormDataFromReducer());
        } catch(error){
            errorLogger(error, 'Error occored while logging with google');
            dispatch(userLogoutFailure())
        }
    }
}

export const startGeneratingSurveyAsync =  (surveyData)=>{
    return  async dispatch=> {
            dispatch(startGeneratingSurvey());
            console.log('SurveyData is', surveyData)
            try{
                await axios.post('/api/generateSurvey', surveyData)
                dispatch(successGeneratingSurvey());
                dispatch(clearSurveyFormDataFromReducer());

            } catch(error){
                errorLogger(error, 'Error occored while generating Survey');
                dispatch(errorGeneratingSurvey());
            }
            
    }
}

export const startAddingSurveyResponseAsync =(data) => {
    let {surveyGeneratorId, reciverMailId,response} = data;
    return async dispatch =>{
        dispatch(startAddingSurveyResponse());
        try{
            await axios.post('/api/sureyResponse', {surveyGeneratorId, reciverMailId,response});
            dispatch(successAddingSurveyResponse());
        } catch(error){
            errorLogger(error, 'Error occored while adding survey response');
            dispatch(errorAddingSurveyResponse());
        }
    
    }
}


