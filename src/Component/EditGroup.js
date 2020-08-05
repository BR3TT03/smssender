import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Typography, TextField, Button, IconButton, CircularProgress } from '@material-ui/core'
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
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom'

const slideVariant = {
    start : {
        x : 500
    },
    end : {
        x : 0,
        transition : {
            type : 'tween',
            duration : 0.3
        }
    },
    exit : {
        x : -500,
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
            <div style={{ display : 'flex', width : '100%', marginBottom : '0.8rem' }}>
               <Link style={{ textDecoration : 'none' }} to={{
                    pathname : '/manage-groups/add-member',
                    state : { groupId : history.location.state.groupId, groupName : history.location.state.groupName }
                }}>
                    <Button variant='contained' 
                                size='small'
                                disableElevation
                                startIcon={<OpenInNewIcon fontSize='small'/>}
                                style={{ textTransform : 'capitalize' }}
                                >
                            Add new member
                    </Button>
               </Link> 
            </div>
            <div style={{ display : 'flex', justifyContent : 'center' , width : '100%', marginBottom : '0.8rem' }}>
                <SearchBox>
                    <input type='text' className='search-inp' placeholder='Search'/>
                    <div className='search-icon'>
                        <SearchIcon color='inherit'/>
                    </div>    
                </SearchBox>
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
  padding : 20px 0px;
`;
export const SearchBox = styled.div`
   width : 300px;
   height : 35px;
   display : flex;
   box-sizing : border-box;

   .search-inp {
       height : 100%;
       flex : 1;
       border-radius : 3px 0px 0px 3px;
       outline : none;
       border : 0;
       box-sizing : border-box;
       padding : 1rem;
       border : 1px solid rgba(0,0,0,0.1);
       font-family : 'roboto';
       font-size : 0.9em;
       &::placeholder {
           color : #9e9e9e;
       }
   }
   .search-icon {
       width : 50px;
       border : 1px solid rgba(0,0,0,0.1);
       border-left : none;
       color : #000;
       border-radius : 0px 3px 3px 0px;
       display : flex;
       justify-content : center;
       align-items : center;
       cursor: pointer;
   }
`