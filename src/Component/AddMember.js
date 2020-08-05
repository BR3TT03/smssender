import React, { useState, useRef } from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion'
import { Typography, TextField, Button, Table, IconButton, CircularProgress } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import readXlsxFile from 'read-excel-file'
import HelpIcon from '@material-ui/icons/Help';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link, useHistory } from 'react-router-dom'
import { addGroupMember } from '../Store/Actions/groupsAction'
import { setUserSuccess } from '../Store/Actions/userAction'
import { connect } from 'react-redux' 

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

function AddMember({ loader, addGroupMember, success, closeModalHandler, setUserSuccess }) {

    const [members, setMembers] = useState([]);
    const [name, setName] = useState({ value : '', error : false });
    const [number, setNumber] = useState({ value : '', error : false });
    const fileRef = useRef(null);
    const history = useHistory();

    const nameChangeHandler = e => {
        setName({ ...name, value : e.target.value, error : false })
    }

    const numberChangeHandler = e => {
        setNumber({ ...number, value : e.target.value, error : false })
    }

    const addNumberHandler = () => {
        let nameError = false;
        let numberError = false;
        if( name.value.length === 0 ) {
            nameError = true
        }
        if( number.value.length !== 10 ) {
            numberError = true
        }
        if( nameError || numberError ) {
            setName({ ...name, error : nameError })
            setNumber({ ...number, error : numberError })
        }
        else {
            setMembers(members.concat({ ...members, memberName : name.value, memberPhone : number.value }));
            setName({ ...name, value : '', error : false })
            setNumber({ ...number, value : '',  error : false })
        }
    }

    const returnKeyHandler = e => {
        if(e.keyCode === 13) {
            addNumberHandler();
        }
    }

    const deleteMemberHandler = i => {
        let newMembers = [...members];
        newMembers.splice(i, 1);
        setMembers([...newMembers]);
    }

    const fileChangeHandler = e => {
        let list = [];
        readXlsxFile(e.target.files[0]).then((rows) => {
              list = rows.map(row => ({ memberName : row[0], memberPhone : row[1] }));
              setMembers(members.concat(list));
        })
    }

    const saveMembersHandler = () => {
        addGroupMember(history.location.state.groupId, members);
    }

    React.useEffect(() => {
        if(success.value){
            closeModalHandler()
            setUserSuccess();
        }
    },[success, closeModalHandler, setUserSuccess])

    return (
        <Container variants={slideVariant} initial='start' animate='end' exit='exit'>
             <Link style={{ textDecoration : 'none' }}
                   to={{
                       pathname : '/manage-groups/edit-group',
                       state : { groupId : history.location.state.groupId, groupName : history.location.state.groupName } 
                   }}>
                    <ArrowBackIcon />
             </Link>
              <Typography variant='body1' color='textPrimary'>
                  Add member
             </Typography>
             <InputContainer>
                <StyledTextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        type="text"
                        size = 'small'
                        value={name.value}
                        onChange={nameChangeHandler}
                        autoFocus
                        disabled={loader}
                        error = {name.error}
                        helperText = { name.error ? 'Enter a valid name.' : ''}
                        onKeyDown = {returnKeyHandler}
                    /> 
                <StyledTextField
                        label="Number"
                        variant="outlined"
                        fullWidth
                        type="number"
                        disabled={loader}
                        size = 'small'
                        onChange={numberChangeHandler}
                        value={number.value}
                        style={{ marginLeft : '10px' }}
                        error={number.error}
                        helperText = { number.error ? 'Number must be of 10 digits.' : '' }
                        onKeyDown = {returnKeyHandler}
                    /> 
            </InputContainer>
            <div style={{ display : 'flex', justifyContent : 'space-between' , width : '100%', marginBottom : '0.8rem' }}>
                <div style={{ display : 'flex', alignItems : 'center' }}>
                    <Button variant='contained' 
                            size='small'
                            disabled={loader}
                            disableElevation
                            startIcon={<PublishIcon fontSize='small'/>}
                            style={{ textTransform : 'capitalize' }}
                            onClick = {() => fileRef.current.click()}
                            >
                        Import
                    </Button>
                    <HelpIcon style={{ marginLeft : '10px' }} fontSize='small' color='primary'/>
                </div>
                <input type='file' ref={fileRef} style={{ display : 'none' }} onChange={fileChangeHandler} accept='.xlsx , .xls'/>
                <Button variant='contained' 
                        size='small'
                        disableElevation
                        disabled={loader}
                        color='primary'
                        style={{ textTransform : 'capitalize' }}
                        onClick={addNumberHandler}
                        >
                     Add
                </Button>
            </div>
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
                                members.length !==0 && members.map((list, index) => 
                                    <TableRow key={index}>
                                            <TableCell>{index + 1}.</TableCell>
                                            <TableCell align="right">{list.memberName}</TableCell>
                                            <TableCell align="right">{list.memberPhone}</TableCell>
                                            <TableCell align="right">
                                                <IconButton size='small' onClick={deleteMemberHandler.bind(null, index)}>
                                                        <RemoveCircleOutlineIcon fontSize='small' color='secondary'/>
                                                </IconButton>
                                            </TableCell>
                                    </TableRow>
                                    )
                            }
                        </TableBody> 
                </Table>
            </StyledTableContainer>
                <div style={{ display : 'flex', justifyContent : 'flex-end', width : '100%', marginTop : '0.8rem' }}>
                    <Button variant='contained' 
                            size='small'
                            color='primary'
                            disabled={loader}
                            disableElevation
                            style={{ textTransform : 'capitalize', marginRight : '7px' }}
                            onClick={saveMembersHandler}
                            >
                         {loader ? <CircularProgress size={20}/> : 'Save'}
                    </Button>
                    <Button variant='contained' 
                            size='small'
                            disabled={loader}
                            disableElevation
                            style={{ textTransform : 'capitalize' }}
                            onClick={closeModalHandler}
                            >
                        Cancel
                    </Button>
                </div>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        success : state.userReducer.success,
        loader : state.groupsReducer.addingMemberLoader,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addGroupMember : (groupId, groupList) => dispatch(addGroupMember(groupId, groupList)),
        setUserSuccess : () => dispatch(setUserSuccess())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMember);

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
