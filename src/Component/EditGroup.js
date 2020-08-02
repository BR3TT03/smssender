import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Typography, TextField, Button, IconButton, CircularProgress } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import  { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'
import { updateGroupName, loadGroupList } from '../Store/Actions/groupsAction'
import  { connect } from 'react-redux'

const slideVariant = {
    start : {
        x : '100%'
    },
    end : {
        x : 0,
        transition : {
            type : 'tween',
            duration : 0.3
        }
    },
    exit : {
        x : '-100%',
        transition : {
            type : 'tween',
            duration : 0.3
        }
    }
}
function EditGroup({ closeModalHandler, updateGroupName, updadingGroupNameLoader, loadGroupList, groupList, groupListLoader }) {

    const history = useHistory();
    const [groupName, setGroupName] = useState({ value : '', error : false })

    const groupNameChangeHandler = e => {
        setGroupName({ ...groupName, value : e.target.value, error : false })
    }

    const changeGroupNameHandler = () => {
        updateGroupName(groupName.value, history.location.state.groupId)
    }

    useEffect(() => {
        console.log(history)
        setGroupName(prev => {
            return {
                ...prev,
                value : history.location.state.groupName,
                error : false
            }
        })
    }, [history])

    useEffect(() => {
        loadGroupList(history.location.state.groupId, 1)
    }, [loadGroupList, history.location.state.groupId])

    return (
        <Container variants={slideVariant} initial='start' animate='end' exit='exit'>
              <Typography variant='body1' color='textPrimary'>
                  Edit Group Name
             </Typography>
             <InputContainer>
                <StyledTextField
                        label="Group name"
                        variant="outlined"
                        fullWidth
                        type="text"
                        size = 'small'
                        value = {groupName.value}
                        onChange = {groupNameChangeHandler}
                        error = { groupName.error }
                        helperText = { groupName.error ? 'Enter valid group name.' : '' }
                    />
                   <Button 
                        style={{ marginLeft:'7px', textTransform : 'capitalize' }}
                        variant="contained" color='primary' 
                        disableElevation
                        disabled={updadingGroupNameLoader}
                        onClick={changeGroupNameHandler}>
                        {updadingGroupNameLoader ? <CircularProgress size={20}/> : 'Save'}
                   </Button> 
            </InputContainer>
            <Typography variant='body1' color='textPrimary' gutterBottom>
                  Edit Group List
             </Typography>
             <Typography variant='subtitle2' color='textSecondary'>
                    Add members
                </Typography>
             <InputContainer>
                <StyledTextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        type="text"
                        size = 'small'
                    />
                     <StyledTextField
                        label="Phone no"
                        variant="outlined"
                        fullWidth
                        type="number"
                        size = 'small'
                        style={{ marginLeft : '7px' }}
                    />
            </InputContainer>
            <div style={{ display : 'flex', justifyContent : 'space-between', width : '100%', marginBottom : '0.8rem' }}>
                <Button variant='contained' 
                        size='small'
                        disableElevation
                        style={{ textTransform : 'capitalize' }}
                        startIcon={<PublishIcon fontSize='small'/>}
                        >
                     Import
                </Button>
                <Button variant='contained' 
                        size='small'
                        disableElevation
                        color='primary'
                        style={{ textTransform : 'capitalize' }}
                        >
                     Add
                </Button>
            </div>
           { !groupListLoader ?
                groupList.length !== 0 ?
                    <StyledTableContainer>
                            <Table size='small' stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                                <TableCell>S.N</TableCell>
                                                <TableCell align="right">Name</TableCell>
                                                <TableCell align="right">Phone no</TableCell>
                                                <TableCell align="right">Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                <TableBody>
                                    {
                                        groupList.map((list, index) => 
                                            <TableRow key={list.memberId}>
                                                    <TableCell>{++index}.</TableCell>
                                                    <TableCell align="right">{list.memberName}</TableCell>
                                                    <TableCell align="right">{list.memberPhone}</TableCell>
                                                    <TableCell align="right">
                                                        <IconButton size='small'>
                                                                <RemoveCircleOutlineIcon fontSize='small' color='secondary'/>
                                                        </IconButton>
                                                    </TableCell>
                                            </TableRow>
                                            )
                                     }
                                 </TableBody> 
                            </Table>
                        </StyledTableContainer>
                  :
                <Empty>
                    <Typography variant='subtitle2' 
                                style={{ fontSize : '13px', fontWeight : '400' }} 
                                color='textSecondary' 
                                align='center' 
                                component='div'>
                            This group is empty. You can add some by importing an excel file or by typing manually.
                    </Typography>
                </Empty>
             :
             <Empty>
                 <CircularProgress size={30}/>
            </Empty>
            }
            <div style={{ display : 'flex', justifyContent : 'flex-end', width : '100%', marginTop : '0.8rem' }}>
                <Button variant='contained' 
                        size='small'
                        color='primary'
                        disableElevation
                        style={{ textTransform : 'capitalize', marginRight : '7px' }}
                        >
                     Save
                </Button>
                <Button variant='contained' 
                        size='small'
                        disableElevation
                        onClick={closeModalHandler}
                        style={{ textTransform : 'capitalize' }}
                        >
                     Cancel
                </Button>
            </div>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        updadingGroupNameLoader : state.groupsReducer.updadingGroupNameLoader,
        groupList : state.groupsReducer.groupList,
        groupListLoader : state.groupsReducer.groupListLoader,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateGroupName : (groupName, groupId) => dispatch(updateGroupName(groupName, groupId)),
        loadGroupList : (groupId, pageNo) => dispatch(loadGroupList(groupId, pageNo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGroup);

const Container = styled(motion.div)`
  display : flex;
  flex-direction : column;
  width : 100%;
  align-items : flex-start;
`;
const InputContainer = styled.div`
    margin : 10px 0px 20px;
    display : flex;
    position : relative;
    width : 100%;
    .MuiFormHelperText-root {
        font-weight : 500;
    }
`
const StyledTextField = styled(TextField)`
    ${({ theme }) => `
        label {
            font-weight : 500;
        }
        .Mui-focused {
            font-weight : 400;
        }
        .MuiOutlinedInput-root {
            fieldset {
                border-color: rgba(0, 0, 0, 0.23);
            }
            &:hover fieldset {
                border-color: rgba(0, 0, 0, 0.23);
            }
            &.Mui-focused fieldset {
                border-color: ${theme.palette.primary.main};
            }
        }
        .MuiFormHelperText-root {
            top : 100%;
            margin-top : 0px;
            margin-left : 5px;
        }
        `}
`
const StyledTableContainer = styled(TableContainer)`
   overflow-y : auto;
    ::-webkit-scrollbar {
    width: 14px;
    height: 14px;
    }
    ::-webkit-scrollbar-thumb {
    height: 6px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    border-radius: 7px;
    background-color: rgba(0, 0, 0, .2);
    }
    ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
    }
    ::-webkit-scrollbar-corner {
    background-color: transparent;
    }
`;
const Empty = styled.div`
  width : 100%;
  display : flex;
  justify-content : center;
  padding : 20px 10px;
`;