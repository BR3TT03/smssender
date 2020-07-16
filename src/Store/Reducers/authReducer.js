import { START_REGISTRATION, REGISTRATION_SUCCESS, START_LOGIN, LOGIN_SUCCESS } from '../Actions/actionTypes';

const initState = {
    registerLoader : false,
    loginLoader : false
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case START_REGISTRATION : 
                    return {
                        ...state,
                        registerLoader : true
                    }
        case REGISTRATION_SUCCESS : 
                   return {
                       ...state,
                       registerLoader : false
                   }   
        case START_LOGIN : 
                     return {
                         ...state,
                         loginLoader : true
                     }
        case LOGIN_SUCCESS : 
                     return {
                         ...state,
                         loginLoader : false
                     }  
        default : return state;
    }
 
}

export default authReducer;