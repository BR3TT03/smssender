import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { TextField, Button, CircularProgress } from '@material-ui/core'
import { motion } from 'framer-motion'
import { updateGroupMember } from '../Store/Actions/groupsAction'
import { setUserSuccess } from '../Store/Actions/userAction'
import  { connect } from 'react-redux'

const slideVariant = {
    start : {
        y : '-100%',
        opacity : 0
    },
    end : {
        y : 0,
        opacity : 1,
        transition : {
            type : 'tween',
            duration : 0.2
        }
    }
}

function EditGroupMember({ openEditModal, closeEditHandler,updatingGroupMemberLoader, updateGroupMember, success, setUserSuccess }) {

    const [name, setName] = useState({ value : '', error : false });
    const [number, setNumber] = useState({ value : '', error : false });

    const changeNameHandler = e => {
        setName({ ...name, value : e.target.value, error : false })
    }

    const changeNumberHandler = e => {
        setNumber({ ...number, value : e.target.value, error : false })
    }

    const updateMemberHandler = () => {
        let nameError = false;
        let numberError = false;
        if(name.value.length < 1) {
            nameError = true;
        }
        if(number.value.length !== 10) {
            numberError = true;
        }
        if(nameError || numberError) {
            setNumber({ ...number, error : numberError });
            setName({ ...name, error : nameError })
        }
        else {
            updateGroupMember(openEditModal.memberId, name.value, number.value)
        }
    }

    const returnKeyPress = e => {
        if(e.keyCode === 13){
            updateMemberHandler();
        }
    }

    React.useEffect(() => {
        if(success.value){
            closeEditHandler()
            setUserSuccess();
        }
    },[success, closeEditHandler, setUserSuccess])

    useEffect(() => {
        setName(prev => ({ ...prev, value : openEditModal.memberName }));
        setNumber(prev => ({ ...prev, value : openEditModal.memberPhone }));
    }, [openEditModal.memberName, openEditModal.memberPhone ])

    return (
        <Container>
            <FormContainer variants={slideVariant} initial='start' animate='end' >
                    <InputContainer>
                        <StyledTextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                type="text"
                                size = 'small'
                                value={name.value}
                                onChange={changeNameHandler}
                                disabled={updatingGroupMemberLoader}
                                error={name.error}
                                onKeyDown = {returnKeyPress}
                                helperText={name.error ? 'Enter a valid name' : ''}
                            /> 
                        <StyledTextField
                                label="Phone"
                                variant="outlined"
                                fullWidth
                                type="text"
                                size = 'small'
                                style={{ marginLeft : '7px' }}
                                value={number.value}
                                disabled={updatingGroupMemberLoader}
                                onKeyDown = {returnKeyPress}
                                onChange={changeNumberHandler}
                                error = {number.error}
                                helperText={number.error ? 'Number must be 10 digits long.' : ''}
                            /> 
                    </InputContainer>
                    <div style={{ display : 'flex', justifyContent : 'flex-end', width : '100%' }}>
                        <Button variant='contained' 
                                size='small'
                                color='primary'
                                disableElevation
                                disabled={updatingGroupMemberLoader}
                                style={{ textTransform : 'capitalize', marginRight : '7px' }}
                                onClick={updateMemberHandler}
                                >
                            {updatingGroupMemberLoader ? <CircularProgress size={20}/> : 'Save'}
                        </Button>
                        <Button variant='contained' 
                                size='small'
                                disableElevation
                                style={{ textTransform : 'capitalize' }}
                                onClick={closeEditHandler}
                                disabled={updatingGroupMemberLoader}
                                >
                            Cancel
                        </Button>
                    </div>
            </FormContainer>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        updatingGroupMemberLoader : state.groupsReducer.updatingGroupMemberLoader,
        success : state.userReducer.success,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateGroupMember : (memberId, memberName, memberPhone) => dispatch(updateGroupMember(memberId, memberName, memberPhone)),
        setUserSuccess : () => dispatch(setUserSuccess())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGroupMember)

const Container = styled.div`
    position : absolute;
    top : 0;
    left : 0;
    height : 100%;
    width : 100%;
    background : rgba(0, 0, 0, 0.4);
    z-index : 3;
`;
const FormContainer = styled(motion.div)`
   box-sizing : border-box;
   padding : 1rem; 
   background : #fff;
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