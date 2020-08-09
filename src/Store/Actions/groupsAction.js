import { LOADING_GROUPS, LOADING_GROUPS_SUCCESS, CREATING_GROUPS, CREATING_GROUPS_FAIL, CREATING_GROUPS_SUCCESS,
        UPDATING_GROUP_NAME, UPDATING_GROUP_NAME_SUCCESS, UPDATING_GROUP_NAME_ERROR, LOADING_GROUP_LIST, LOADING_GROUP_LIST_SUCCESS,
        LOADING_GROUP_LIST_ERROR, DELETE_GROUP, DELETE_GROUP_ERROR, DELETE_GROUP_SUCCESS, ADDING_GROUP_MEMBER, ADDING_GROUP_MEMBER_SUCCESS,
        ADDING_GROUP_MEMBER_ERROR, DELETEING_GROUPMEMBER, DELETEING_GROUPMEMBER_ERROR, DELETEING_GROUPMEMBER_SUCCESS, UPDATING_GROUPMEMBER,
        UPDATING_GROUPMEMBER_ERROR, UPDATING_GROUPMEMBER_SUCCESS, SET_CREATE_SUCCESS } from './actionTypes';
import { error, success } from './userAction'
import { logOut } from './authAction'
import axios from 'axios'

const loadingGroups = () => {
    return {
        type : LOADING_GROUPS
    }
}

const loadingGroupsSuccess = groups => {
    return {
        type : LOADING_GROUPS_SUCCESS,
        groups : groups
    }
}

export const loadGroups = () => {
    return  (dispatch, getState) => {
        const token = getState().authReducer.token;
        dispatch(loadingGroups());
        axios.get(`/groups`,
                { headers : { Authorization : `Bearer ${token}` } })
             .then(res => {
                 if(res.status === 200){
                     dispatch(loadingGroupsSuccess(res.data));
                 } 
                 else {
                     dispatch(logOut())
                 }
             })   
             .catch(err => {
                dispatch(logOut())
             })
    }   
}

const creatingGroups = () => {
    return {
        type : CREATING_GROUPS
    }
}
const creatingGroupsSuccess = data => {
    return {
        type : CREATING_GROUPS_SUCCESS,
        data : data
    }
}
const creatingGroupsFail = () => {
    return {
        type : CREATING_GROUPS_FAIL
    }
}

export const setCreateSuccess = () => {
    return dispatch => {
        dispatch({ type : SET_CREATE_SUCCESS })
    }
}

export const createGroup = groupName => {
    return (dispatch, getState) => { 
        dispatch(creatingGroups());
        const token = getState().authReducer.token;
        axios.post('/groups/create', { groupName : groupName },
                 { headers : { Authorization : `Bearer ${token}` } })
               .then(res => {
                   if(res.status === 200){
                       dispatch(creatingGroupsSuccess(res.data)); 
                   }
                   else {
                        dispatch(creatingGroupsFail());
                        dispatch(error('Could not create groups. Try again later'));
                   }
               })
               .catch(err => {
                   dispatch(creatingGroupsFail());
                   dispatch(error('Could not create groups. Try again later'));
               })  
    }
}

const updatingGroupName = () => {
    return {
        type : UPDATING_GROUP_NAME
    }
}
const updatingGroupNameSuccess = (groupName, groupId) => {
    return {
        type : UPDATING_GROUP_NAME_SUCCESS,
        groupName : groupName,
        groupId : groupId
    }
}
const updatingGroupNameError = () => {
    return {
        type : UPDATING_GROUP_NAME_ERROR
    }
}
export const updateGroupName = (groupName, groupId) => {
    return (dispatch, getState) => {
         dispatch(updatingGroupName());
         const token = getState().authReducer.token;
         console.log(token);
         axios.patch(`/groups/updateGroupDetails?groupName=${groupName}&groupId=${groupId}`,null,
                 { headers : { Authorization : `Bearer ${token}` }})
                 .then(_ => {
                     dispatch(updatingGroupNameSuccess(groupName, groupId))
                 })
                 .catch(err => {
                     dispatch(updatingGroupNameError());
                     dispatch(error('Could not create groups. Try again later'));
                 })
    }
}

const loadingGroupList = () => {
    return {
        type : LOADING_GROUP_LIST
    }
}
const loadingGroupListSuccess = (data) => {
    return {
        type : LOADING_GROUP_LIST_SUCCESS,
        data : data
    }
}
const loadingGroupListError = () => {
    return {
        type : LOADING_GROUP_LIST_ERROR
    }
}

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 

export const loadGroupList = (groupId, pageNo, filter) => {
    return (dispatch, getState) => {
         const token = getState().authReducer.token;
         dispatch(loadingGroupList());
         if(isNumber(filter)) {
            axios.get(`/groups/members?groupId=${groupId}&page=${pageNo}&numberFilter=${filter}`,
            { headers : { Authorization : `Bearer ${token}` }})
            .then(res => {
                dispatch(loadingGroupListSuccess(res.data));
            })  
            .catch(err =>{
                dispatch(loadingGroupListError());
                dispatch(error('Could not create groups. Try again later'));
            })
         }
         else {
                axios.get(`/groups/members?groupId=${groupId}&page=${pageNo}&nameFilter=${filter}`,
                { headers : { Authorization : `Bearer ${token}` }})
                .then(res => {
                    dispatch(loadingGroupListSuccess(res.data));
                })  
                .catch(err =>{
                    dispatch(loadingGroupListError());
                    dispatch(error('Could not create groups. Try again later'));
                })
         }
   
    }
}

const deletingGroups = () => {
    return {
        type : DELETE_GROUP
    }
}

const deletingGroupsSuccess = groupId => {
    return {
        type : DELETE_GROUP_SUCCESS,
        groupId : groupId
    }
}

const deletingGroupsError = () => {
    return {
        type : DELETE_GROUP_ERROR
    }
}

export const deleteGroup = groupId => {
    return (dispatch, getState) => {
        dispatch(deletingGroups());
        const token = getState().authReducer.token;
        axios.delete(`/groups/delete?groupIds=${groupId}`,
            { headers : { Authorization : `Bearer ${token}` }})
            .then(_ => {
                dispatch(deletingGroupsSuccess(groupId))
            })
            .catch(_ => {
                dispatch(deletingGroupsError());
                dispatch(error('Could not delete group. Try again later'));
            })
    }
}

const addingGroupMember = () => {
    return {
        type : ADDING_GROUP_MEMBER
    }
}

const addingGroupMemberSuccess = () => {
    return {
        type : ADDING_GROUP_MEMBER_SUCCESS
    }
}

const addingGroupMemberError = () => {
    return {
        type : ADDING_GROUP_MEMBER_ERROR
    }
}

export const addGroupMember = (groupId, groupList) => {
    return (dispatch, getState) => {
        dispatch(addingGroupMember());
        const token = getState().authReducer.token;
        axios.post(`/groups/addGroupMember?groupId=${groupId}`, 
                    groupList,
                { headers : { Authorization : `Bearer ${token}` }})
             .then(res => {
                 console.log(res);
                 dispatch(addingGroupMemberSuccess());
                 dispatch(success('Members added to the groups successfully.'))
             })
             .catch(err => {
                 dispatch(addingGroupMemberError());
                 dispatch(error('Could not add members. Try again later'));
             })
    }
}

const deletingGroupMembers = () => {
    return {
        type : DELETEING_GROUPMEMBER
    }
}

const deletingGroupMembersSuccess = (groupMemberId) => {
    return {
        type : DELETEING_GROUPMEMBER_SUCCESS,
        groupMemberId : groupMemberId
    }
}

const deletingGroupMembersError = () => {
    return {
        type : DELETEING_GROUPMEMBER_ERROR
    }
}

export const deleteGroupMembers = (groupMemberId) => {
    return (dispatch, getState) => {
        dispatch(deletingGroupMembers());
        const token = getState().authReducer.token
        axios.delete(`/groups/deleteGroupMember?memberId=${groupMemberId}`,
                { headers : { Authorization : `Bearer ${token}` }})
                .then(res => {
                    if(res.status === 200) {
                        dispatch(deletingGroupMembersSuccess(groupMemberId))
                    }
                    else {
                        dispatch(deletingGroupMembersError());
                        dispatch(error('Could not delete group member. Please try again later'))
                    }
                })
                .catch(err => {
                    console.log(err.response);
                    dispatch(deletingGroupMembersError());
                    dispatch(error('Could not delete group member. Please try again later'))
                })
    }
}

const updatingGroupMember = () => {
    return {
        type : UPDATING_GROUPMEMBER
    }
}
const updatingGroupMemberSuccess = (memberId, memberName, memberPhone) => {
    return {
        type : UPDATING_GROUPMEMBER_SUCCESS,
        memberId : memberId,
        memberName : memberName,
        memberPhone : memberPhone
    }
}
const updatingGroupMemberError = () => {
    return {
        type : UPDATING_GROUPMEMBER_ERROR
    }
}
export const updateGroupMember = (memberId, memberName, memberPhone) => {
    return (dispatch, getState) => {
        dispatch(updatingGroupMember());
        const token = getState().authReducer.token;
        axios.patch(`/groups/updateGroupMemberDetails?memberId=${memberId}`,{ memberName : memberName , memberPhone : memberPhone },
                { headers : { Authorization : `Bearer ${token}` }})
             .then(res => {
                 if(res.status === 200) {
                    dispatch(updatingGroupMemberSuccess(memberId, memberName, memberPhone))
                    dispatch(success('Member updated successfully.'))
                 } 
                 else {
                     dispatch(updatingGroupMemberError());
                     dispatch(error('Could not update member detail. Please try again later'))
                 }

             })   
             .catch(_ => {
                dispatch(updatingGroupMemberError());
                dispatch(error('Could not update member detail. Please try again later'))
             })
    }
}
