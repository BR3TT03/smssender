import { SENDING_EMAIL_FOR_RESET, SENDING_EMAIL_FOR_RESET_SUCCESS, SENDING_EMAIL_FOR_RESET_FAIL,
        RESETTING_PASSWORD, RESETTING_PASSWORD_SUCCESS, RESETTING_PASSWORD_FAIL } from './actionTypes';
import axios from 'axios';

const sendingEmailForReset = () => {
    return {
        type : SENDING_EMAIL_FOR_RESET
    }
}

const sendingEmailForResetSuccess = () => {
    return {
        type : SENDING_EMAIL_FOR_RESET_SUCCESS
    }
}

const sendingEmailForResetFail = () => {
    return {
        type : SENDING_EMAIL_FOR_RESET_FAIL
    }
}

export const sendEmailToReset = email => {
    return dispatch => {
        dispatch(sendingEmailForReset());
        axios.post(`/resetPassword/${email}`)
          .then(res => {
              if(res.status === 200){
                dispatch(sendingEmailForResetSuccess()); 
              }
              else {
                dispatch(sendingEmailForResetFail());
              }
          })
          .catch(err => {
              console.log(err.response.status);
              dispatch(sendingEmailForResetFail());
          })
    }
}

const resettingPassword = () => {
    return {
        type : RESETTING_PASSWORD
    }
}

const resettingPasswordSuccess = () => {
    return {
        type : RESETTING_PASSWORD_SUCCESS
    }
}

const resettingPasswordFail = () => {
    return {
        type : RESETTING_PASSWORD_FAIL
    }
}

export const resetPassword = (newPassword, { resetToken }) => {
    console.log(newPassword, resetToken)
    return dispatch => {
        dispatch(resettingPassword());
        axios.post(`/user/resetPassword?token=${resetToken}&password=${newPassword}`)
            .then(_ => {
                dispatch(resettingPasswordSuccess());
            })
            .catch(_ => {
                dispatch(resettingPasswordFail());
            })
    }
}