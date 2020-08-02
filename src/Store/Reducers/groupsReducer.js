import { LOADING_GROUPS_ERROR, LOADING_GROUPS_SUCCESS, LOADING_GROUPS, CREATING_GROUPS, CREATING_GROUPS_FAIL, CREATING_GROUPS_SUCCESS,
        UPDATING_GROUP_NAME, UPDATING_GROUP_NAME_SUCCESS, UPDATING_GROUP_NAME_ERROR, LOADING_GROUP_LIST, LOADING_GROUP_LIST_SUCCESS,
        LOADING_GROUP_LIST_ERROR, DELETE_GROUP_ERROR, DELETE_GROUP_SUCCESS, DELETE_GROUP } from '../Actions/actionTypes';

const initState = {
    groups : [],
    groupList : [],
    groupsLoader : false,
    createGroupsLoader : false,
    createSuccess : false,
    updadingGroupNameLoader : false,
    groupListLoader : false,
    deletingGroupLoader : false
}

const groupsReducer = ( state= initState, action ) => {
    switch(action.type) {
        case LOADING_GROUPS : 
                        return {
                            ...state,
                            groupsLoader : true
                        }
        case LOADING_GROUPS_SUCCESS : 
                        return {
                            ...state,
                            groupsLoader : false,
                            groups : [...action.groups]
                        }
        case LOADING_GROUPS_ERROR : 
                        return {
                            ...state,
                            groupsLoader : false
                        }
        case CREATING_GROUPS :
                        return {
                            ...state,
                            createGroupsLoader : true
                        }
        case CREATING_GROUPS_SUCCESS :
                        return {
                            ...state,
                            createGroupsLoader : false,
                            groups : [...action.data],
                            createSuccess : true
                        }
        case CREATING_GROUPS_FAIL :
                        return {
                            ...state,
                            createGroupsLoader : false
                        }
        case UPDATING_GROUP_NAME : 
                        return {
                            ...state,
                            updadingGroupNameLoader : true
                        }
        case UPDATING_GROUP_NAME_SUCCESS : 
                        return {
                            ...state,
                            updadingGroupNameLoader : false
                        }
        case UPDATING_GROUP_NAME_ERROR : 
                        return {
                            ...state,
                            updadingGroupNameLoader : false
                        }
        case LOADING_GROUP_LIST :
                        return {
                            ...state,
                            groupListLoader : true
                        }      
        case LOADING_GROUP_LIST_SUCCESS :
                        return {
                            ...state,
                            groupListLoader : false,
                            groupList : [...action.data]
                        }       
        case LOADING_GROUP_LIST_ERROR :
                        return {
                            ...state,
                            groupListLoader : false
                        }      
        case DELETE_GROUP : 
                        return {
                            ...state,
                            deletingGroupLoader : true
                        }
        case DELETE_GROUP_SUCCESS : 
                        const index = state.groups.findIndex(group => group.groupId === action.groupId);
                        let newGroups = [...state.groups];
                        if(index > -1){
                            newGroups.splice(index, 1);
                        }
                        return {
                            ...state,
                            deletingGroupLoader : false,
                            groups : [...newGroups]
                        }
        case DELETE_GROUP_ERROR : 
                        return {
                            ...state,
                            deletingGroupLoader : false
                        }
        default : return state;
    }
}

export default groupsReducer;