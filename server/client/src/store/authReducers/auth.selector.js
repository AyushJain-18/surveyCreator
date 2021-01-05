import {createSelector} from  'reselect';

export const selectAuth = state => state.auth;

export const selectIsUserLogedIn      = createSelector([selectAuth], auth => !!auth.userDetails);

export const selectLogedInUserData    = createSelector([selectAuth], auth=> auth.userDetails);

export const selectIsUserAuthError    = createSelector([selectAuth], auth=> auth.isAuthError);

export const selectIsFetchingUserAuth = createSelector([selectAuth], auth=> auth.isFetchingUserLoginDetails);
