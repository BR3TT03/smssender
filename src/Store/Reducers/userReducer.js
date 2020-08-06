import { LOADING_USER_DATA, LOAD_USER_DATA_SUCCESS, SENDING_MESSAGE, SENDING_MESSAGE_SUCCESS, SENDING_MESSAGE_FAIL,
         SUCCESS, ERROR, SET_USER_ERROR, SET_USER_SUCCESS, CHANGING_PASSWORD, CHANGING_PASSWORD_SUCCESS, CHANGING_PASSWORD_ERROR,
         CHANGING_USER_DETAIL, CHANGING_USER_DETAIL_SUCCESS, CHANGING_USER_DETAIL_ERROR } from '../Actions/actionTypes';

const initState = {
    user : {},
    userLoader : false,
    messageLoader : false,
    success : { value : false, label : '' },
    error : { value : false, label : '' },
    changePasswordLoader : false,
    changeDetailLoader : false
}

const userReducer = (state = initState, action) => {
    switch(action.type) {
        case LOADING_USER_DATA :
                        return {
                            ...state,
                            userLoader : true
                        }
        case LOAD_USER_DATA_SUCCESS : 
                        return {
                            ...state,
                            userLoader : false,
                            user : { ...action.user }
                        }         
        case SENDING_MESSAGE : 
                        return {
                            ...state,
                            messageLoader : true
                        }    
        case SENDING_MESSAGE_SUCCESS : 
                        return {
                            ...state,
                            messageLoader : false,
                            user : {
                                ...state.user,
                                smsLimit : state.user.smsLimit - action.count
                            }
                        }   
        case SENDING_MESSAGE_FAIL : 
                        return {
                            ...state,
                            messageLoader : false
                        }
        case SUCCESS : 
                     return {
                         ...state,
                         success : {
                             ...state.success,
                             value : true,
                             label : action.data
                         }
                     }   
        case ERROR : 
                     return {
                         ...state,
                         error : {
                             ...state.error,
                             value : true,
                             label : action.error
                         }
                     }   
        case SET_USER_SUCCESS : 
                     return {
                         ...state,
                         success : {
                             ...state.success,
                             value : false
                         }
                     }
        case SET_USER_ERROR : 
                     return {
                         ...state,
                         error : {
                             ...state.error,
                             value : false
                         }
                     }
        case CHANGING_PASSWORD : 
                     return {
                         ...state,
                         changePasswordLoader : true
                     }
        case CHANGING_PASSWORD_SUCCESS : 
                return {
                    ...state,
                    changePasswordLoader : false
                }
        case CHANGING_PASSWORD_ERROR : 
                return {
                    ...state,
                    changePasswordLoader : false
                }
        case CHANGING_USER_DETAIL :
                 return {
                    ...state,
                    changeDetailLoader : true
                 }
        case CHANGING_USER_DETAIL_SUCCESS :
                    return {
                        ...state,
                        changeDetailLoader : false,
                        user : {
                            ...state.user,
                            name : action.name,
                            phone : action.phone
                        }
                    }
        case CHANGING_USER_DETAIL_ERROR :
                    return {
                        ...state,
                        changeDetailLoader : false
                    }
        default : return state;
    }
}

export default userReducer;