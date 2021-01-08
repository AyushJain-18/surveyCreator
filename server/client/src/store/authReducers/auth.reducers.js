import authTypes from './auth.actiontypes'
const INITIAL_AUTH_STATE = {
    isAuthError   : false,
    isLoading     : false,
    userDetasls   : null 
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
        default: return state
    }
}

export default authReducers;