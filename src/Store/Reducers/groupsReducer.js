import { LOADING_GROUPS_ERROR, LOADING_GROUPS_SUCCESS, LOADING_GROUPS, CREATING_GROUPS, CREATING_GROUPS_FAIL, CREATING_GROUPS_SUCCESS,
        UPDATING_GROUP_NAME, UPDATING_GROUP_NAME_SUCCESS, UPDATING_GROUP_NAME_ERROR, LOADING_GROUP_LIST, LOADING_GROUP_LIST_SUCCESS,
        LOADING_GROUP_LIST_ERROR, DELETE_GROUP_ERROR, DELETE_GROUP_SUCCESS, DELETE_GROUP, ADDING_GROUP_MEMBER,ADDING_GROUP_MEMBER_SUCCESS,
        ADDING_GROUP_MEMBER_ERROR, DELETEING_GROUPMEMBER, DELETEING_GROUPMEMBER_ERROR, DELETEING_GROUPMEMBER_SUCCESS, UPDATING_GROUPMEMBER_ERROR,
        UPDATING_GROUPMEMBER, UPDATING_GROUPMEMBER_SUCCESS, SET_CREATE_SUCCESS } from '../Actions/actionTypes';

const initState = {
    groups : [],
    groupList : [],
    newlyAddedGroup : {},
    groupsLoader : false,
    createGroupsLoader : false,
    createSuccess : false,
    updadingGroupNameLoader : false,
    groupListLoader : false,
    deletingGroupLoader : false,
    addingMemberLoader : false,
    deletingGroupMembersLoader : false,
    updatingGroupMemberLoader : false
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
                            newlyAddedGroup : {
                                ...state.newlyAddedGroup,
                                groupName : action.data[action.data.length - 1].groupName,
                                groupId : action.data[action.data.length - 1].groupId,
                            },
                            groups : [...action.data],
                            createSuccess : true
                        }
        case SET_CREATE_SUCCESS : 
                        return {
                            ...state,
                            createSuccess : false
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
                        const groupIndex = state.groups.findIndex(group => group.groupId === action.groupId);
                        let newGroup = [...state.groups];
                        newGroup[groupIndex] = { ...newGroup[groupIndex], groupName : action.groupName }
                        return {
                            ...state,
                            updadingGroupNameLoader : false,
                            groups : [...newGroup]
                        }
        case UPDATING_GROUP_NAME_ERROR : 
                        return {
                            ...state,
                            updadingGroupNameLoader : false
                        }
        case LOADING_GROUP_LIST :
                        return {
                            ...state,
                            groupListLoader : true,
                        }      
        case LOADING_GROUP_LIST_SUCCESS :
                        console.log(action.data);
                        return {
                            ...state,
                            groupListLoader : false,
                            groupListLoaderSecondary : false, 
                            groupList : [...action.data],
                        }       
        case LOADING_GROUP_LIST_ERROR :
                        return {
                            ...state,
                            groupListLoader : false,
                            groupListLoaderSecondary : false
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
        case ADDING_GROUP_MEMBER : 
                        return {
                            ...state,
                            addingMemberLoader : true
                        }  
        case ADDING_GROUP_MEMBER_SUCCESS : 
                        return {
                            ...state,
                            addingMemberLoader : false
                        }  
        case ADDING_GROUP_MEMBER_ERROR : 
                        return {
                            ...state,
                            addingMemberLoader : false
                        }    
        case DELETEING_GROUPMEMBER : 
                        return {
                            ...state,
                            deletingGroupMembersLoader : true
                        }
        case DELETEING_GROUPMEMBER_SUCCESS :
                        const groupMemberIndex = state.groupList.findIndex( member => member.memberId === action.groupMemberId )
                        let newGroupMembers = [...state.groupList];
                        console.log(groupMemberIndex)
                        if(groupMemberIndex > -1){
                            newGroupMembers.splice(groupMemberIndex, 1);
                        }
                        return {
                            ...state,
                            deletingGroupMembersLoader : false,
                            groupList : [...newGroupMembers]
                        }
        case DELETEING_GROUPMEMBER_ERROR : 
                        return {
                            ...state,
                            deletingGroupMembersLoader : false
                        }
        case UPDATING_GROUPMEMBER : 
                        return {
                            ...state,
                            updatingGroupMemberLoader : true
                        }
        case UPDATING_GROUPMEMBER_SUCCESS : 
                        const groupListIndex = state.groupList.findIndex(group => group.memberId === action.memberId);
                        let newGroupList = [...state.groupList];
                        newGroupList[groupListIndex] = { ...newGroupList[groupListIndex], memberName : action.memberName, memberPhone : action.memberPhone }
                        return {
                            ...state,
                            updatingGroupMemberLoader : false,
                            groupList : [...newGroupList]
                        }
        case UPDATING_GROUPMEMBER_ERROR : 
                        return {
                            ...state,
                            updatingGroupMemberLoader : false
                        }
        default : return state;
    }
}

export default groupsReducer;