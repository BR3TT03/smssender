import {  LOAD_USER_DATA_SUCCESS, LOADING_USER_DATA, SENDING_MESSAGE, SENDING_MESSAGE_SUCCESS, SENDING_MESSAGE_FAIL, SET_USER_SUCCESS,
        SET_USER_ERROR, SUCCESS, ERROR, CHANGING_PASSWORD, CHANGING_PASSWORD_SUCCESS, CHANGING_PASSWORD_ERROR, CHANGING_USER_DETAIL,
        CHANGING_USER_DETAIL_SUCCESS, CHANGING_USER_DETAIL_ERROR,GENERATING_API_KEY, GENERATING_API_KEY_SUCCESS, GENERATING_API_KEY_ERROR,
        FETCHING_API_KEY } from './actionTypes';
import { logOut } from './authAction';
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
        axios.get(`/userInfo`,
            { headers : { Authorization : `Bearer ${token}`} }
        )
        .then(res => {
            if(res.status === 200) {
                 dispatch(loadUserDataSuccess(res.data));
            }
            else {
                dispatch(logOut())
            }
        })
        .catch(err => {
            dispatch(logOut())
        })
    }
}

const sendingMessage = () => {
    return {
        type : SENDING_MESSAGE
    }
}

const sendingMessageSuccess = count => {
    return {
        type : SENDING_MESSAGE_SUCCESS,
        count : count
    }
}

const sendingMessageFail = () => {
    return {
        type : SENDING_MESSAGE_FAIL
    }
}

export const success = data => {
    return {
        type : SUCCESS,
        data : data
    }
}

export const error = error => {
    return {
        type : ERROR,
        error : error
    }
}

export const sendMessage = (numberList, sms) => {
    return (dispatch, getState) => {
        dispatch(sendingMessage());
        let numbers = [];
        const token = getState().authReducer.token;
        for(let key in numberList){
            if(numberList[key].value){
                numbers.push(key);
            }
        }
        if(numbers.length === 0){
            dispatch(sendingMessageFail());
            dispatch(error('Enter atleast one receipt.'));
        }
        else {
            axios.post(`/sendSMS`,
                { sms : sms, phone : numbers },
                { headers : { Authorization : `Bearer ${token}`} }
              )
               .then(res => {
                   dispatch(sendingMessageSuccess(numbers.length));
                   dispatch(success('Message successfully sent to '+numbers.length+' person.'));
               })
               .catch(err => {
                  if(err.response.data.status === 402){
                    dispatch(sendingMessageFail());
                    dispatch(error('SMS limit exceeds. Change your sms subscription plan.'));
                  }
                  else {
                    dispatch(sendingMessageFail());
                    dispatch(error('Could not send sms right now. Please try again later'));
                  }
               })
        }
    }
} 

export const setUserSuccess = () => {
    return {
        type : SET_USER_SUCCESS
    }
}

export const setUserError = () => {
    return {
        type : SET_USER_ERROR
    }
}

const changingPassword = () => {
    return {
        type : CHANGING_PASSWORD
    }
}
const changingPasswordSuccess = () => {
    return {
        type : CHANGING_PASSWORD_SUCCESS
    }
}
const changingPasswordError = () => {
    return {
        type : CHANGING_PASSWORD_ERROR
    }
}
export const changePassword = (oldPass, newPass) => {
    return (dispatch, getState) => {
        dispatch(changingPassword())
        const token = getState().authReducer.token;
        axios.post(`/user/changePassword?oldPassword=${oldPass}&newPassword=${newPass}`,
               null,
               { headers : { Authorization : `Bearer ${token}`} }
               )
          .then(res => {
               if(res.status === 200){
                    dispatch(changingPasswordSuccess());
                    dispatch(success(res.data))
               }
          })  
          .catch(err => {
              if(err.response.status === 401){
                dispatch(changingPasswordError());
                dispatch(error('Current password does not match'))
              }
              else {
                dispatch(changingPasswordError());
                dispatch(error('Could not change password right now.'))
              }
          }) 
        setTimeout(() => {
            
           
        },1000)  
    }
}

const changingUserDetail = () => {
    return {
        type : CHANGING_USER_DETAIL
    }
}
const changingUserDetailSuccess = (name, phone) => {
    return {
        type : CHANGING_USER_DETAIL_SUCCESS,
        name : name,
        phone : phone
    }
}
const changingUserDetailError = () => {
    return {
        type : CHANGING_USER_DETAIL_ERROR
    }
}

export const changeUserDetail = (name, phone) => {
    console.log(name, phone);
    return (dispatch, getState) => {
        dispatch(changingUserDetail());
        const token = getState().authReducer.token;
        axios.patch(`/updateUserDetails`, { name : name, phone : phone },
             { headers : { Authorization : `Bearer ${token}`} })
             .then(res => {
                 if(res.status === 200) {
                    dispatch(changingUserDetailSuccess(name, phone));
                 }
                 else {
                    dispatch(changingUserDetailError());
                    dispatch(error('Could not change detail right now.'))
                 }
             })
             .catch(_ => {
                dispatch(changingUserDetailError());
                dispatch(error('Could not change detail right now.'))
             })
    }
}

const generatingApiKey = () => {
    return {
        type : GENERATING_API_KEY
    }
}
const generatingApiKeySuccess = (apiKey) => {
    return {
        type : GENERATING_API_KEY_SUCCESS,
        apiKey : apiKey
    }
}
const generatingApiKeyError = () => {
    return {
        type : GENERATING_API_KEY_ERROR
    }
}
export const generateApi = () => {
    return (dispatch, getState) => {
        dispatch(generatingApiKey());
        const token = getState().authReducer.token;
        axios.patch(`/getApiKey`, null,
                { headers : { Authorization : `Bearer ${token}`} })
             .then(res => {
                 dispatch(generatingApiKeySuccess(res.data.apiKey));   
             })
             .catch(err => {
                dispatch(generatingApiKeyError());
                dispatch(error('Could not generate API key right now.'))
             })   
    }
}

const fetchingApiKey = () => {
    return {
        type : FETCHING_API_KEY
    }
}

export const getApiKey = () => {
    return (dispatch, getState) => {
        dispatch(fetchingApiKey());
        const token = getState().authReducer.token;
        axios.get(`/getApiKey`,
                { headers : { Authorization : `Bearer ${token}`} })
             .then(res => {
                 dispatch(generatingApiKeySuccess(res.data));   
             })
             .catch(err => {
                dispatch(generatingApiKeyError());
                dispatch(error('Could not get API key right now.'))
             })   
    }
}