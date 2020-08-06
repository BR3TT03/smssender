import React from 'react'
import styled from 'styled-components';
import  { Button, Typography, TextField, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { changeUserDetail } from '../Store/Actions/userAction'

function ChangeName({ name, phone, changeUserDetail, changeDetailLoader }) {

    const [changeName, setChangeName] = React.useState({ value : name, error : false });
    const [changePhone, setChangePhone] = React.useState({ value : phone, error : false });

    const nameChangeHandler = e => {
        setChangeName({ ...changeName, value : e.target.value, error : false });
    }

    const phoneChangeHandler = e => {
        setChangePhone({ ...changePhone, value : e.target.value, error : false });
    }

    const clickHandler = () => {
        let changeNameError = false;
        let changePhoneError = false;
        if(changeName.value.length < 1) {
            changeNameError = true;
        }
        if(changePhone.value.length !== 10) {
            changePhoneError = true
        }
        if( changeNameError || changePhoneError ) {
            setChangeName({ ...changeName, error : changeNameError });
            setChangePhone({ ...changePhone, error : changePhoneError });
        }
        else {
            changeUserDetail(changeName.value, changePhone.value)
        }
    }

    return (
        <Container>
            <Header>
                <Typography variant='subtitle2' color='textPrimary' style={{ fontSize : '16px' }}>
                        Change name
                </Typography>    
            </Header> 
            <Body>
                <InputContainer>
                    <StyledTextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            type="text"
                            size = 'small'
                            disabled={changeDetailLoader}
                            value={changeName.value}
                            onChange={nameChangeHandler}
                            error = {changeName.error}
                            helperText = { changeName.error ? 'Enter valid name' : '' }
                        />
                    <StyledTextField
                            label="Phone"
                            variant="outlined"
                            fullWidth
                            type="number"
                            disabled={changeDetailLoader}
                            style={{ marginTop : '20px' }}
                            size = 'small'
                            value={changePhone.value}
                            onChange={phoneChangeHandler}
                            error = {changePhone.error}
                            helperText = { changePhone.error ? 'Phone number must be 10 digits long.' : '' }
                        />
                </InputContainer> 
                <div style={{ display : 'flex', justifyContent : 'flex-end', width : '90%' }}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            disableElevation
                            disabled={changeDetailLoader}
                            size='small'
                            style={{ textTransform : 'capitalize', marginTop : '20px' }} 
                            onClick={clickHandler}>
                                 {changeDetailLoader ? <CircularProgress size={20}/> : 'Save'}
                        </Button>
                    </div>   
            </Body> 
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        name : state.userReducer.user.name,
        phone : state.userReducer.user.phone,
        changeDetailLoader : state.userReducer.changeDetailLoader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeUserDetail : (name, phone) => dispatch(changeUserDetail(name, phone))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeName);

const Container = styled.div`
    display : flex;
    flex-direction : column;
    margin-bottom : 20px;
    border-radius : 10px;
    background : #fff;
    box-shadow: rgba(53, 64, 82, 0.05) 1px 0px 14px 0px;
`
const Body = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    padding : 20px 0px;
`
const Header = styled.div`
   height : 50px;
   padding : 0px 20px;
   display : flex;
   align-items : center;
   border-bottom : 1px solid rgba(0, 0, 0, 0.12);
`
const InputContainer = styled.div`
    margin : 10px 0px;
    position : relative;
    width : 90%;
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
            position : absolute;
            top : 100%;
            margin-top : 0px;
            margin-left : 0px;
        }
        `}
`