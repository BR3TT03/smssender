import { START_REGISTRATION, REGISTRATION_SUCCESS, START_LOGIN, LOGIN_SUCCESS } from './actionTypes';

const startRegistration = () => {
    return {
        type : START_REGISTRATION
    }
}

const registrationSuccess = () => {
    return {
        type : REGISTRATION_SUCCESS
    }
}

export const register = () => {
    return dispatch => {
        dispatch(startRegistration());
        setTimeout(() => {
            dispatch(registrationSuccess());    
        }, 2000);
    }
} 
const startLogin = () => {
    return {
        type : START_LOGIN
    }
}

const loginSuccess = () => {
    return {
        type : LOGIN_SUCCESS
    }
}

export const login = () => {
    return dispatch => {
        dispatch(startLogin());
        setTimeout(() => {
            dispatch(loginSuccess());    
        }, 2000);
    }
} 