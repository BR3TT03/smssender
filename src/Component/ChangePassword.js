import React from 'react'
import styled from 'styled-components';
import { Typography, TextField, Button } from '@material-ui/core';
// import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress'
import { changePassword } from '../Store/Actions/userAction';
import { connect } from 'react-redux'

function ChangePassword({ changePassword, loader, success }) {

    const [oldPass, setOldPass] = React.useState({ value : '', error : false, msg : 'Enter a valid password' });
    const [newPass, setNewPass] = React.useState({ value : '', error : false, msg : 'Enter a valid password' });
    const [confirmPass, setConfirmPass] = React.useState({ value : '', error : false, msg : 'Password does not match' });

    const oldPassHandler = e => {
        setOldPass({ ...oldPass, value : e.target.value, error : false });
    }

    const newPassHandler = e => {
        setNewPass({ ...newPass, value : e.target.value, error : false });
    }

    const confirmPassHandler = e => {
        setConfirmPass({ ...confirmPass, value : e.target.value, error : false });
    }

    const passwordChangeHadler = () => {
        let oldPassError = false;
        let newPassError = false;
        let confirmPassError = false;
        if(oldPass.value.length === 0) {
            oldPassError = true;
        }
        if(newPass.value.length === 0) {
            newPassError = true;
        }
        if(confirmPass.value !== newPass.value){
            confirmPassError = true;
        }
        if(oldPassError || newPassError || confirmPassError){
            setOldPass({ ...oldPass, error : oldPassError });
            setNewPass({ ...newPass, error : newPassError });
            setConfirmPass({ ...confirmPass, error : confirmPassError });
        }
        else {
            changePassword(oldPass.value, newPass.value)
        }
    }

    React.useEffect(() => {
        if(success.value){
            setOldPass({ value : '', error : false, msg : 'Enter a valid password' });
            setNewPass({ value : '', error : false, msg : 'Enter a valid password' });
            setConfirmPass({ value : '', error : false, msg : 'Enter a valid password' });
        }
    },[success])

    return (
        <Container>
             <Header>
                <Typography variant='subtitle2' color='textPrimary' style={{ fontSize : '16px' }}>
                        Change Password
                </Typography>    
            </Header> 
            <Body>
                    <InputContainer>
                        <StyledTextField
                                label="Current password"
                                variant="outlined"
                                fullWidth
                                type="password"
                                size = 'small'
                                value={oldPass.value}
                                onChange={oldPassHandler}
                                error = {oldPass.error}
                                helperText = {oldPass.error ? oldPass.msg : '' }
                            />
                    </InputContainer> 
                    <InputContainer>
                        <StyledTextField
                                label="New password"
                                variant="outlined"
                                fullWidth
                                type="password"
                                size = 'small'
                                value={newPass.value}
                                onChange={newPassHandler}
                                error = {newPass.error}
                                helperText = { newPass.error ? newPass.msg : '' }
                         />
                    </InputContainer> 
                    <InputContainer>
                        <StyledTextField
                                label="Confirm password"
                                variant="outlined"
                                fullWidth
                                type="password"
                                size = 'small'
                                value={confirmPass.value}
                                onChange={confirmPassHandler}
                                error = {confirmPass.error}
                                helperText = { confirmPass.error ? confirmPass.msg : '' }
                            />
                    </InputContainer> 
                    {/* <Alert severity="error" fullWidth>Enter a correct password</Alert> */}
                    <div style={{ display : 'flex', justifyContent : 'flex-end', alignItems : 'center', width : '90%', marginTop : '20px' }}>
                         {loader ? <CircularProgress size={25} style={{ marginRight : '10px' }}/> : null}
                          <Button 
                                variant="contained" 
                                color="primary" 
                                disableElevation
                                size='small'
                                style={{ textTransform : 'capitalize' }} 
                                onClick={passwordChangeHadler}
                                disabled={loader} >
                                Change Password
                           </Button>
                     </div>   
            </Body>   
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        loader : state.userReducer.changePasswordLoader,
        success : state.userReducer.success
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changePassword : (oldPass, newPass) => dispatch(changePassword(oldPass, newPass))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);

const Container = styled.div`
    display : flex;
    flex-direction : column;
    margin-bottom : 20px;
    border-radius : 10px;
    background : #fff;
    box-shadow: rgba(53, 64, 82, 0.05) 1px 0px 14px 0px;
`
const Header = styled.div`
   height : 50px;
   padding : 0px 20px;
   display : flex;
   align-items : center;
   border-bottom : 1px solid rgba(0, 0, 0, 0.12);
`
const Body = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    padding : 20px 0px;
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
