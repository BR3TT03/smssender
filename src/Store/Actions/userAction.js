import {  LOAD_USER_DATA_SUCCESS, LOADING_USER_DATA } from './actionTypes';
import axios from 'axios';

const loadingUser = () => {
    return {
        type : LOADING_USER_DATA
    }
}

const loadUserDataSuccess = user => {
    return {
        type : LOAD_USER_DATA_SUCCESS,
        data : user
    }
}

export const loadUser = () => {
    return (dispatch, getState) => {
        dispatch(loadingUser());
        const token = getState().authReducer.token;
        console.log(token);
        setTimeout(() => {
            dispatch(loadUserDataSuccess());
        }, 1000)
        axios.get('/userByEmail/abhinay.shrestha11@gmail.com',
                { headers : { 'Authorization' : `Bearer ${token}`} }
        )
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }
}