import authTypes from './auth.actiontypes';
import axios from 'axios';

export const startUserLogin  =() =>({
    type:  authTypes.START_FETCHING_USER_LOGIN_DETAILS
})

export const userLoginSuccess  =(userData) =>({
    type        :  authTypes.SUCCESS_FETCHING_USER_LOGIN_DETAILS,
    payload     : userData
})

export const userLoginFailure  =() =>({
    type:  authTypes.ERROR_FETCHING_USER_LOGIN_DETAILS
})


export const startUserLogout  =() =>({
    type:  authTypes.SUCCESS_USER_LOGOUT
})

export const userLogoutSuccess  =(userData) =>({
    type        :  authTypes.SUCCESS_USER_LOGOUT,
})

export const userLogoutFailure  =() =>({
    type:  authTypes.ERROR_USER_LOGOUT
})


// --------------Assonchronous action creator ------------- //

export const startFetchingUserLoginDetails = ()=>{
    return (dispatch) => {
        dispatch(startUserLogin());
        axios.get()
    }
}
