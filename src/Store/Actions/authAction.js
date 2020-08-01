import { START_REGISTRATION, REGISTRATION_MAIL_SUCCESS, START_LOGIN, LOGIN_SUCCESS, VERIFY_EMAIL_SUCCESS,
      VERIFYING_EMAIL, REGISTRATION_FAIL, LOG_OUT, LOGIN_FAIL, RESENDING_EMAIL, RESEND_EMAIL_FAIL, RESEND_EMAIL_SUCCESS,
        UNVERIFIED_ACCOUNT, SENDING_EMAIL_TO_UNVERIFIED_ACCOUNT, SENDING_EMAIL_TO_UNVERIFIED_ACCOUNT_SUCCESS,
      SENDING_EMAIL_TO_UNVERIFIED_ACCOUNT_FAIL } from './actionTypes';
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

const loginSuccess = (token) => {
    localStorage.setItem('token', token);
    return {
        type : LOGIN_SUCCESS,
        token : token
    }
}

const loginFail = (error) => {
    return {
        type : LOGIN_FAIL,
        error : error
    }
}

const unverifiedAccount = () => {
    return {
        type : UNVERIFIED_ACCOUNT
    }
}

export const login = (data) => {
    return dispatch => {
        dispatch(startLogin());
        axios.post(`/authenticate`, data)
          .then(res => {
              if(res.data.role === "ROLE_USER"){
                dispatch(loginSuccess(res.data.token));
              }
              else {
                dispatch(loginFail('Incorrect email or password.'))
              }
              
          })
          .catch(err => {
              if(err.response.status === 406){
                    dispatch(unverifiedAccount());
              }
              else {
                    dispatch(loginFail('Incorrect email or password.'))
              }
          })
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

export const verifyEmail = token => {
    console.log(token)
    return dispatch => {
        dispatch(verifyingEmail());
        axios.get(`/user/verify?token=${token}`)
          .then(res => {
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

const resendingEmail = () => {
    return {
        type : RESENDING_EMAIL
    }
}

const resendEmailSuccess = () => {
    return {
        type : RESEND_EMAIL_SUCCESS
    }
}

const resendEmailFail = () => {
    return {
        type : RESEND_EMAIL_FAIL
    }
}

export const resendEmail = email => {
     return dispatch => {
         dispatch(resendingEmail())
         axios.post(`reSendEmail/${email}`)
           .then(_ => {
               dispatch(resendEmailSuccess())
           })
           .catch(err => {
               dispatch(resendEmailFail('Problem in resending email.'))
           })
     }
}

export const logOut = () => {
    localStorage.removeItem('token');
    return {
        type : LOG_OUT
    }
}

export const checkAuth = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token){
            dispatch(loginSuccess(token));
        }
    }
}

const sendingEmailToUnverifiedAccount = () => {
    return {
        type : SENDING_EMAIL_TO_UNVERIFIED_ACCOUNT
    }
}

const sendingEmailToUnverifiedAccountSuccess = () => {
    return {
        type : SENDING_EMAIL_TO_UNVERIFIED_ACCOUNT_SUCCESS
    }
}

const sendingEmailToUnverifiedAccountFail = () => {
    return {
        type : SENDING_EMAIL_TO_UNVERIFIED_ACCOUNT_FAIL
    }
}

export const sendEmailToUnverifiedAccount = email => {
     return dispatch => {
         dispatch(sendingEmailToUnverifiedAccount())
         axios.post(`reSendEmail/${email}`)
           .then(_ => {
               dispatch(sendingEmailToUnverifiedAccountSuccess())
           })
           .catch(err => {
               dispatch(sendingEmailToUnverifiedAccountFail('Problem in resending email.'))
           })
     }
}
