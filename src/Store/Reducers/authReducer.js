import { START_REGISTRATION, REGISTRATION_MAIL_SUCCESS, START_LOGIN, LOGIN_SUCCESS,VERIFYING_EMAIL , VERIFY_EMAIL_SUCCESS,
        SET_SUCCESS, REGISTRATION_FAIL, SET_ERROR, LOGIN_FAIL, LOG_OUT, RESENDING_EMAIL, RESEND_EMAIL_SUCCESS,
        RESEND_EMAIL_FAIL } from '../Actions/actionTypes';

const initState = {
    token : null,
    registerLoader : false,
    loginLoader : false,
    registerStatus : false,
    verifyingLoader : false,
    success : { value : false, msg : '' },
    error : { value : false, msg : '' }
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case START_REGISTRATION : 
                    return {
                        ...state,
                        registerLoader : true
                    }
        case REGISTRATION_MAIL_SUCCESS : 
                   return {
                       ...state,
                       registerLoader : false,
                       registerStatus : true
                   }   
        case START_LOGIN : 
                     return {
                         ...state,
                         loginLoader : true
                     }
        case LOGIN_SUCCESS : 
                     return {
                         ...state,
                         loginLoader : false,
                         token : action.token
                     }  
        case LOGIN_FAIL: 
                     return {
                         ...state,
                         loginLoader : false,
                         error : {
                            ...state.error,
                            value : true,
                            msg : action.error
                        }
                     }               
        case VERIFYING_EMAIL : 
                        return {
                            ...state,
                            verifyingLoader : true
                        }   
        case REGISTRATION_FAIL : 
                         return {
                             ...state,
                             registerLoader : false,
                             verifyingLoader : false,
                             error : {
                                ...state.error,
                                value : true,
                                msg : action.error
                            }
                         }   
        case VERIFY_EMAIL_SUCCESS : 
                     return {
                         ...state,
                         verifyingLoader : false,
                         success : {
                             ...state.success,
                             value : true,
                             msg : 'Email has been verified successfully. Please Login to continue.'
                         }
                     } 
        case RESENDING_EMAIL :
                      return {
                          ...state,
                          registerLoader : true
                      }  
        case RESEND_EMAIL_SUCCESS :
                        return {
                            ...state,
                            registerLoader : false,
                            success : {
                                ...state.success,
                                value : true,
                                msg : 'Verification link has been sent successfully'
                            }
                        } 
        case RESEND_EMAIL_FAIL :
                        return {
                            ...state,
                            registerLoader : false,
                            error : {
                                ...state.error,
                                value : true,
                                msg : action.error
                            }
                        } 
        case LOG_OUT :
                    return {
                        ...state,
                        token : null
                    } 
        case SET_SUCCESS : 
                     return {
                         ...state,
                         success : {
                            ...state.success,
                            value : false
                        }
                     }
        case SET_ERROR : 
                     return {
                         ...state,
                         error : {
                            ...state.error,
                            value : false
                        }
                     }
        default : return state;
    }
 
}

export default authReducer;