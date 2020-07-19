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
        user : user
    }
}

export const loadUser = () => {
    return (dispatch, getState) => {
        dispatch(loadingUser());
        const token = getState().authReducer.token;
        axios.get(`/userByEmail/abhinay.shrestha11@gmail.com`,
            { headers : { Authorization : `Bearer ${token}`} }
        )
        .then(res => {
            dispatch(loadUserDataSuccess(res.data));
        })
        .catch(err => {
            console.log(err);
        })
    }
}