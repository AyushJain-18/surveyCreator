import {createSelector} from  'reselect';

//isLoadingSurvey
// isLoadingForAddingSurveyResponse    : false,
// isAddingSurveyResponseError         : false,
// isAddingSurveyResponseSuccess       : false
// userSurveyData              : action.payload,
// isFetchingUserSurveyData    : false,
// errorFetchinUserSurveyData  : false,
// surveyResponse

export const selectAuth = state => state.auth; 


export const selectIsUserLogedIn      = createSelector([selectAuth], auth => !!(auth.userDetails && auth.userDetails.display_name));

export const selectUserCredits        = createSelector([selectAuth], auth => auth.userDetails?auth.userCredit: null);

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

export const selectUserSurveyData                = createSelector([selectAuth], auth=> auth.userSurveyData);

export const selectIsFetchingUserSurveyData      = createSelector([selectAuth], auth=> auth.isFetchingUserSurveyData);

export const selectUserSurveyDataError           = createSelector([selectAuth], auth=> auth.errorFetchinUserSurveyData);

export const selectSurveyResponseMessage         = createSelector([selectAuth], auth=> auth.surveyResponse);
