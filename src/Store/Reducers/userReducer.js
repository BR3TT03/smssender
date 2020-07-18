import { LOADING_USER_DATA, LOAD_USER_DATA_SUCCESS } from '../Actions/actionTypes';

const initState = {
    user : {},
    userLoader : false
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
        default : return state;
    }
}

export default userReducer;