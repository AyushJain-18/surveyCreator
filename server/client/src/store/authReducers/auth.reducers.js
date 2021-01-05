import authTypes from './auth.actiontypes'
const INITIAL_AUTH_STATE = {
    isAuthError                     : false,
    isFetchingUserLoginDetails      : false,
    userDetails                     : null 
}
const authReducers = (state = INITIAL_AUTH_STATE, action) =>{
    switch(action.type){
        case authTypes.START_FETCHING_USER_LOGIN_DETAILS :
        case authTypes.START_USER_LOGOUT:
            return{
                ...state,
                isFetchingUserLoginDetails: true,
                isAuthError: false,
            }
        case authTypes.ERROR_FETCHING_USER_LOGIN_DETAILS :
        case authTypes.ERROR_USER_LOGOUT:
            return{
                ...state,
                isAuthError: true,
                isFetchingUserLoginDetails: false,
            }
            case authTypes.SUCCESS_FETCHING_USER_LOGIN_DETAILS :
                return{
                    ...state,
                    isFetchingUserLoginDetails: false,
                    isAuthError: false,
                    userDetails: action.payload
                }
                case authTypes.SUCCESS_USER_LOGOUT :
                return{
                    ...state,
                    isFetchingUserLoginDetails: false,
                    isAuthError: false,
                    userDetails: null
                }
        default: return state
    }
}

export default authReducers;