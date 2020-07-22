import { SENDING_EMAIL_FOR_RESET, SENDING_EMAIL_FOR_RESET_SUCCESS, SENDING_EMAIL_FOR_RESET_FAIL, RESETTING_PASSWORD,
       RESETTING_PASSWORD_FAIL, RESETTING_PASSWORD_SUCCESS } 
    from '../Actions/actionTypes';

const initState = {
    emailLoader : false,
    emailSendSuccess : false,
    emailError : false,
    resetSuccess : false,
    resetError : false
}

const resetPasswordReducer = (state = initState, action) => {
    switch(action.type){
        case SENDING_EMAIL_FOR_RESET :
                            return {
                                ...state,
                                emailLoader : true
                            }
        case SENDING_EMAIL_FOR_RESET_SUCCESS :
                            return {
                                ...state,
                                emailLoader : false,
                                emailSendSuccess : true
                            }
        case SENDING_EMAIL_FOR_RESET_FAIL : 
                            return {
                                ...state,
                                emailLoader : false,
                                emailError : true
                            }    
        case RESETTING_PASSWORD : 
                             return {
                                 ...state,
                                 emailLoader : true
                             }
        case RESETTING_PASSWORD_SUCCESS :
                             return {
                                 ...state,
                                 emailLoader : false,
                                 resetSuccess : true
                             }   
        case RESETTING_PASSWORD_FAIL :
                                return {
                                    ...state,
                                    emailLoader : false, 
                                    resetError : true
                                } 
        default : return state;
    }
}

export default resetPasswordReducer;