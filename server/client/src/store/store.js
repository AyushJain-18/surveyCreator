import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {logger} from 'redux-logger';

import authReducers from './authReducers/auth.reducers'


const middleware = [];
middleware.push(thunk);

//if(process.env.NODE_ENV ==="development"){
    middleware.push(logger);
// }
// reducers 
const reducers = combineReducers({
    auth: authReducers
})
const store = createStore(reducers, applyMiddleware(...middleware));

export default store;