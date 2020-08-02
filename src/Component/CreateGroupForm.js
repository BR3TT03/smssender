import React, { useState, useEffect } from 'react'
import { Typography, TextField, Button, CircularProgress } from '@material-ui/core'
import styled from 'styled-components';
import { createGroup } from '../Store/Actions/groupsAction'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'

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

function CreateGroupForm({ closeModalHandler, createGroup, loader, createSuccess }) {

    const [groupName, setGroupName] = useState({ value : '', error : false });
    const history = useHistory()

    const groupNameChangeHandler = e => {
        setGroupName({ ...groupName, value : e.target.value, error : false })
    }

    const createGroupHandler = e => {
        if(groupName.value.length > 0) {
            createGroup(groupName.value);
        }
        else {
            setGroupName({ ...groupName, value : e.target.value, error : true })
        }
    }

    const onEnterPress = e =>{
        if(e.keyCode === 13) {
            createGroupHandler();
        }
    }

    useEffect(() => {
        if(createSuccess){
            history.push({
                pathname : '/manage-groups/edit-group'
            })
        }
    }, [createSuccess, history])

    return (
        <Container variants={slideVariant} initial='start' animate='end' exit='exit'>
             <Typography variant='h6' color='textPrimary'>
                  Create Group  
             </Typography>
             <InputContainer>
                <StyledTextField
                        label="Group name"
                        variant="outlined"
                        fullWidth
                        type="text"
                        size = 'medium'
                        disabled={loader}
                        value={groupName.value}
                        onChange={groupNameChangeHandler}
                        error = {groupName.error}
                        helperText = { groupName.error ? 'Enter a valid group name' : '' }
                        onKeyDown={onEnterPress}
                        autoFocus
                    />
            </InputContainer>
            <Action>
                { loader ? <CircularProgress size={25}/> : null }
                <div>
                    <Button size='small' color='primary' variant='contained' 
                            disableElevation
                            disabled={loader}
                            onClick={createGroupHandler}
                            style={{ margin : '0rem 0.7rem', textTransform : 'capitalize' }}>
                        Create Group
                    </Button>
                </div>
                <div>
                    <Button size='small' variant='contained' style={{ textTransform : 'capitalize' }}
                            onClick={closeModalHandler}
                            disabled={loader}
                            disableElevation>
                        Cancel
                    </Button>
                </div>
            </Action>      
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        loader : state.groupsReducer.createGroupsLoader,
        createSuccess : state.groupsReducer.createSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createGroup : groupName => dispatch(createGroup(groupName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupForm);

const Container = styled(motion.div)`
  display : flex;
  flex-direction : column;
  width : 100%;
  align-items : flex-start;
`;

const InputContainer = styled.div`
    margin : 20px 0px;
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
const Action = styled.div`
   box-sizing : border-box;
   display : flex;
   justify-content : flex-end;
   width : 100%;
   padding : 0.1rem 0px;
   align-items : center;
`;

