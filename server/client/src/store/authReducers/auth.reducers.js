import authTypes from './auth.actiontypes'
const INITIAL_AUTH_STATE = {
    isAuthError             : false,
    isLoading               : false,
    formData                : null,
    isSurveyGenerateError   : false,
    isSurveyGenerateSuccess : false, 
    userDetails             : null 
}
const authReducers = (state = INITIAL_AUTH_STATE, action) =>{
    switch(action.type){
        case authTypes.START_USER_LOGIN :
        case authTypes.START_USER_LOGOUT:
        case authTypes.START_FETCHING_USER_LOGIN_DETAILS:
        case authTypes.START_ADDING_CREDIT:
        case authTypes.START_GENERATING_SURVEY:    
            return{
                ...state,
                isLoading: true,
                isAuthError: false,
                isSurveyGenerateError: false,
                isSurveyGenerateSuccess: false
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
        case authTypes.ERROR_GENERATING_SURVEY:
            return{
                ...state,
                isSurveyGenerateError: true,
                isLoading: false,
                isSurveyGenerateSuccess: false
            }
        case authTypes.SUCCESS_GENERATING_SURVEY :
            return{
                ...state,
                isLoading: false,
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
                userDetails: action.payload
            }
        case authTypes.SUCCESS_USER_LOGOUT :
        return{
            ...state,
            isLoading: false,
            isAuthError: false,
            userDetails: null
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
        default: return state
    }
}

export default authReducers;