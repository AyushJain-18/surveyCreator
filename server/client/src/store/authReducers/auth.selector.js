import {createSelector} from  'reselect';

//isLoadingSurvey
// isLoadingForAddingSurveyResponse    : false,
// isAddingSurveyResponseError         : false,
// isAddingSurveyResponseSuccess       : false

export const selectAuth = state => state.auth; 


export const selectIsUserLogedIn      = createSelector([selectAuth], auth => !!(auth.userDetails && auth.userDetails.display_name));

export const selectUserCredits        = createSelector([selectAuth], auth => auth.userDetails?auth.userDetails.credit: null);

export const selectLogedInUserData    = createSelector([selectAuth], auth=> auth.userDetails);

export const selectIsUserAuthError    = createSelector([selectAuth], auth=> auth.isAuthError);

export const selectUserFormData       = createSelector([selectAuth],  auth=>  auth.formData);

export const selectErrorGeneratingSurvey = createSelector([selectAuth],  auth=>  auth.isSurveyGenerateError);

export const selectSurveyGeneratorSuccess = createSelector([selectAuth],  auth=>  auth.isSurveyGenerateSuccess);

export const selectIsFetchingUserAuth   = createSelector([selectAuth], auth=> auth.isLoading);

export const selectIsLoadingSurvey      = createSelector([selectAuth], auth=> auth.isLoadingSurvey);

export const selectIsLoadingForAddingSurveyResponse = createSelector([selectAuth], auth=> auth.isLoadingForAddingSurveyResponse);

export const selectIsAddingSurveyResponseError = createSelector([selectAuth], auth=> auth.isAddingSurveyResponseError);

export const selectIsAddingSurveyResponseSuccess = createSelector([selectAuth], auth=> auth.isAddingSurveyResponseSuccess);