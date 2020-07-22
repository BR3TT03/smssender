import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import resetPasswordReducer from './resetPasswordReducer';

export const rootReducer = combineReducers({
    authReducer,
    userReducer,
    resetPasswordReducer
})