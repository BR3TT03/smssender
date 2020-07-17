import { START_REGISTRATION, REGISTRATION_MAIL_SUCCESS, START_LOGIN, LOGIN_SUCCESS, VERIFY_EMAIL_SUCCESS,
      VERIFYING_EMAIL, REGISTRATION_FAIL } from './actionTypes';
import axios from 'axios';

const startRegistration = () => {
    return {
        type : START_REGISTRATION
    }
}

const registrationMailSuccess = () => {
    return {
        type : REGISTRATION_MAIL_SUCCESS
    }
}

const registrationFail = error => {
    return {
        type : REGISTRATION_FAIL,
        error : error
    }
}

export const register = data => {
    return dispatch => {
        dispatch(startRegistration());
        axios.post('/addUser', data)
          .then(res => {
              if(res.data){
                    axios.post(`/sendEmail/${data.email}`)
                    .then(result => {
                        dispatch(registrationMailSuccess());
                        console.log(result)
                    })
                    .catch(err => {
                        dispatch(registrationFail('Server error please try  again later.'));
                    })
              }
              else {
                  dispatch(registrationFail('Email is already in use. Please try another email.'));
              }
          })
          .catch(err => {
                dispatch(registrationFail('Server error please try  again later.'));
          })
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

const verifyingEmail = () => {
    return {
        type : VERIFYING_EMAIL
    }
}

const verifyEmailSuccess = () => {
    return {
        type : VERIFY_EMAIL_SUCCESS
    }
}
// const verifyEmailFail = () => {
//     return {
//         type : VERIFY_EMAIL_FAIL
//     }
// }
export const verifyEmail = token => {
    console.log(token)
    return dispatch => {
        dispatch(verifyingEmail());
        axios.get(`/user/verify?token=${token}`)
          .then(res => {
              console.log(res);
              if(res.data){
                  dispatch(verifyEmailSuccess());
              }
              else {
                dispatch(registrationFail('Verification failed. Please try again.'));
              }
          })
          .catch(err => {
              console.log(err);
          })
    }
}