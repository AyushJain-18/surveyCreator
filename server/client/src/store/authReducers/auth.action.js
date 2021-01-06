import errorLogger from '../../utils/error.logger';
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


// --------------Assonchronous action creator ------------- //

export const startFetchingUserLoginDetailsAsync = ()=>{
    return async (dispatch) => {
        dispatch(startFetchingUserLoginDetails());
        try{
            let response = await axios.get(`/api/getCurrentUser`);
            dispatch(successfullyFetchedUserLoginDetails(response.data))
        } catch(error){
            errorLogger(error, 'Error occored while fetching user login details');
            dispatch(errorInFetchingUserLoginDetails())
        }
    }
}

export const startLoginWithGoogle = ()=>{
    return async (dispatch) => {
        dispatch(startUserLogIn());
        try{
            let response = await axios.get('/auth/google');
            console.log('Response is', response);
        } catch(error){
            errorLogger(error, 'Error occored while logging with google');
            dispatch(userLogInFailure())
        }
    }
}

