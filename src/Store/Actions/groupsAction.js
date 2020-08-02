import { LOADING_GROUPS, LOADING_GROUPS_SUCCESS, LOADING_GROUPS_ERROR, CREATING_GROUPS, CREATING_GROUPS_FAIL, CREATING_GROUPS_SUCCESS,
        UPDATING_GROUP_NAME, UPDATING_GROUP_NAME_SUCCESS, UPDATING_GROUP_NAME_ERROR, LOADING_GROUP_LIST, LOADING_GROUP_LIST_SUCCESS,
        LOADING_GROUP_LIST_ERROR, DELETE_GROUP, DELETE_GROUP_ERROR, DELETE_GROUP_SUCCESS } from './actionTypes';
import { error } from './userAction'
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
const loadingGroupsError = error => {
    return {
        type : LOADING_GROUPS_ERROR,
        error : error
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
                     dispatch(loadingGroupsError())
                     dispatch(error('Could not load groups. Try again later'));
                 }
             })   
             .catch(err => {
                 dispatch(loadingGroupsError())
                 dispatch(error('Could not load groups. Try again later'));
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

export const createGroup = groupName => {
    return (dispatch, getState) => { 
        dispatch(creatingGroups());
        const token = getState().authReducer.token;
        axios.post('/groups/create', { groupName : groupName },
                 { headers : { Authorization : `Bearer ${token}` } })
               .then(res => {
                   if(res.status === 200){
                       console.log(res);
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
const updatingGroupNameSuccess = () => {
    return {
        type : UPDATING_GROUP_NAME_SUCCESS
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
                 { headers : { Authorization : `Bearer ${token}` } } )
                 .then(res => {
                     console.log(res);
                 })
                 .catch(err => {
                     console.log(err.response)
                 })
    }
}

const loadingGroupList = () => {
    return {
        type : LOADING_GROUP_LIST
    }
}
const loadingGroupListSuccess = data => {
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

export const loadGroupList = (groupId, pageNo) => {
    return (dispatch, getState) => {
        dispatch(loadingGroupList());
         const token = getState().authReducer.token;
         axios.get(`/groups/members?groupId=${groupId}&page=${pageNo}`,
                { headers : { Authorization : `Bearer ${token}` } } )
              .then(res => {
                  console.log(res);
                  dispatch(loadingGroupListSuccess(res.data));
              })  
              .catch(err =>{
                  console.log(err);
              })
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
        console.log(groupId)
        axios.delete(`/groups/delete?groupIds=${groupId}`,
            { headers : { Authorization : `Bearer ${token}` }})
            .then(res => {
                console.log(res)
                dispatch(deletingGroupsSuccess(groupId))
            })
            .catch(err => {
                console.log(err)
                dispatch(deletingGroupsError());
                dispatch(error('Could not load groups. Try again later'));
            })
    }
}