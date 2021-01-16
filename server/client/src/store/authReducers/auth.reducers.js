import authTypes from './auth.actiontypes'
const INITIAL_AUTH_STATE = {
    isAuthError                 : false,
    isLoading                   : false,
    isLoadingSurvey             : false,
    formData                    : null,
    isSurveyGenerateError       : false,
    isSurveyGenerateSuccess     : false, 
    userDetails                 : null,
    userCredit                  : 0,
    userSurveyData              : null,
    isFetchingUserSurveyData    : false,
    errorFetchinUserSurveyData  : false,
    surveyResponse              : null, 
    isLoadingForAddingSurveyResponse    : false,
    isAddingSurveyResponseError         : false,
    isAddingSurveyResponseSuccess       : false
}
const authReducers = (state = INITIAL_AUTH_STATE, action) =>{
    switch(action.type){
        case authTypes.START_USER_LOGIN :
        case authTypes.START_USER_LOGOUT:
        case authTypes.START_FETCHING_USER_LOGIN_DETAILS:
        case authTypes.START_ADDING_CREDIT:
            return{
                ...state,
                isLoading: true,
                isAuthError: false,
            }
        case authTypes.ERROR_USER_LOGIN :
        case authTypes.ERROR_USER_LOGOUT:
        case authTypes.ERROR_FETCHING_USER_LOGIN_DETAILS:
        case authTypes.ERROR_ADDING_CREDIT:
            return{
                ...state,
                isAuthError: true,
                isLoading: false,
            }
        case authTypes.START_GENERATING_SURVEY: 
        return{
            ...state,
            isLoadingSurvey: true,
            isSurveyGenerateError: false,
            isSurveyGenerateSuccess: false
        } 
        case authTypes.ERROR_GENERATING_SURVEY:
            return{
                ...state,
                isSurveyGenerateError: true,
                isLoadingSurvey: false,
                isSurveyGenerateSuccess: false
            }
        case authTypes.SUCCESS_GENERATING_SURVEY :
            return{
                ...state,
                isLoadingSurvey: false,
                isSurveyGenerateError: false,
                isSurveyGenerateSuccess: true
            }
        case authTypes.SUCCESS_FETCHING_USER_LOGIN_DETAILS :
        case authTypes.SUCCESS_USER_LOGIN:
        case authTypes.SUCCESS_ADDING_CREDIT:
            return{
                ...state,
                isLoading: false,
                isAuthError: false,
                userDetails: action.payload,
                userCredit: action.payload? action.payload.credit: 0,
            }
        case authTypes.SUCCESS_USER_LOGOUT :
        return{
            ...state,
            isLoading: false,
            isAuthError: false,
            userDetails: null,
            userCredit: null
        }
        case authTypes.ADD_SURVEY_FORM_DATA :
            return{
                ...state,
                formData: action.payload
            }
        case authTypes.RESET_SURVEY_STATUS:
            return{
                ...state,
                isSurveyGenerateError   : false,
                isSurveyGenerateSuccess : false
            }
        case authTypes.CLEAR_SURVEY_FORM_DATA :
            return{
                ...state,
                formData: null
            }
        case authTypes.START_CAPTURING_SURVEY_RESPONSE :
            return{
                ...state,
                isLoadingForAddingSurveyResponse: true,
                isAddingSurveyResponseSuccess: false,
                isAddingSurveyResponseError: false,
                surveyResponse: null
            }
        case authTypes.SUCCESS_CAPTURING_SURVEY_RESPONSE :
            return{
                ...state,
                isLoadingForAddingSurveyResponse: false,
                isAddingSurveyResponseSuccess: true,
                isAddingSurveyResponseError: false,
                surveyResponse: action.payload
            }
        case authTypes.ERROR_CAPTURING_SURVEY_RESPONSE :
            return{
                ...state,
                isAddingSurveyResponseSuccess: false,
                isLoadingForAddingSurveyResponse: false,
                isAddingSurveyResponseError: true,
                surveyResponse: null
            }

        case authTypes.START_FETCHING_USER_SURVEY_DATA :
            return{
                ...state,
                userSurveyData              : null,
                isFetchingUserSurveyData    : true,
                errorFetchinUserSurveyData  : false,
            }
        case authTypes.SUCCESS_FETCHING_USER_SURVEY_DATA:
            return{
                ...state,
                userSurveyData              : action.payload,
                isFetchingUserSurveyData    : false,
                errorFetchinUserSurveyData  : false,
            }
        case authTypes.ERROR_FETCHING_USER_SURVEY_DATA :
            return{
                ...state,
                userSurveyData              : null,
                isFetchingUserSurveyData    : false,
                errorFetchinUserSurveyData  : true,
            }   
        case authTypes.UPDATE_USER_CREDIT :
            return{
                ...state,
                userCredit:  action.payload 
            }   
        default: return state
    }
}

export default authReducers;