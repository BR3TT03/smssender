import React, { useState, useRef } from 'react'
import styled from 'styled-components';
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
import helperImg from '../Assets/helper.JPG'

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
        const regx = /^[9]\d{9}/;
        readXlsxFile(e.target.files[0]).then((rows) => {
              list = rows.map(row => {
                  if(regx.test(row[1])){
                    return { memberName : row[0], memberPhone : row[1] }
                  }
                  return false;
              });
        })
        .then(_ => {
            setMembers(members.concat(list.filter( filterList => filterList !==false )));
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
        <Container>
             <Link style={{ textDecoration : 'none' }}
                   to={{
                       pathname : '/manage-groups/edit-group',
                       state : { groupId : history.location.state.groupId, groupName : history.location.state.groupName } 
                   }}>
                   <IconButton edge='start'>
                        <ArrowBackIcon />
                    </IconButton>    
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
                    <Helper>
                        <HelpIcon fontSize='small' color='primary'/>
                        <div className='helperModal'>
                            <Typography variant='subtitle2' style={{ fontWeight : "400" }}>
                                You can only import excel file.
                            </Typography>
                            <Typography variant='caption' style={{ color : '#757575' }}>
                                Format for excel file is given in below image.
                            </Typography>
                            <img src={helperImg} alt=''/>
                            <Typography variant='caption' color='secondary'>
                                * Don't upload in any other format.
                            </Typography>
                        </div>
                    </Helper>
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
           { members.length !== 0 ? <StyledTableContainer>
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
                                members.map((list, index) => 
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
             :
            <Empty>
                    <Typography variant='subtitle2' 
                                style={{ fontSize : '13px', fontWeight : '400' }} 
                                color='textSecondary' 
                                align='center' 
                                component='div'>
                            You can add some by importing an excel file or by typing manually.
                    </Typography>
             </Empty>
            }
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

const Container = styled.div`
  display : flex;
  flex-direction : column;
  width : 100%;
  align-items : flex-start;
  padding : 0px 1rem 1rem;
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
const Helper = styled.div`
  margin-left : 7px;
  cursor : pointer;
  position : relative;
  .helperModal {
      position : absolute;
      left : calc(100% + 7px);
      top : -10px;
      padding : 0.5rem 1rem;
      width : 250px;
      box-sizing : border-box;
      background : #ede9fb;
      border-radius : 3px;
      flex-direction : column;
      z-index : 3;  
      border : 1px solid #ccc;
      display : none;
      opacity : 0;
      transition : 350ms all;
      &::after {
         content : ''; 
         position : absolute; 
         left : -14px;
         top : 12px;
         border-top : 7px solid transparent;
         border-right : 7px solid #ccc;
         border-bottom : 7px solid transparent;
         border-left : 7px solid transparent;
      }
      img {
          width : 200px;
          object-fit : contain;
          margin : 7px auto;
      }
  }
  &:hover {
    .helperModal {
        display : flex;
        opacity : 1;
    }
  }
`;