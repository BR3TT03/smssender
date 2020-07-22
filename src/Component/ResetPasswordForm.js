import React from 'react'
import styled from 'styled-components';
import { Card, Typography, TextField, Button } from '@material-ui/core';
import logo from '../Assets/logo.png'
import { motion } from 'framer-motion'
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import { resetPassword } from '../Store/Actions/resetPasswordAction';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { Alert } from '@material-ui/lab'

const slideVariant = {
    start : {
        x : '100%'
    },
    end : {
        x : 0,
        transition : {
            type : 'tween',
            duration : 0.2
        }
    }
}

function ResetPasswordForm({ loader, resetPassword, resetSuccess, resetError, resetToken }) {

    const [pass, setPass] = React.useState({ val : '', error : false, errorMsg : 'Enter a valid password' });
    const [confirmPass, setConfirmPass] = React.useState({ val : '', error : false, errorMsg : 'Password doesnot match' });
    const history = useHistory();

    const passChangeHandler = e => {
        setPass({ ...pass, error : false, val : e.target.value });
    }

    const confirmPassChangeHandler = e => {
        setConfirmPass({ ...confirmPass, error : false, val : e.target.value });
    }

    const passwordHandler = () => {
        let passError = false;
        let confirmPassError = false;
        if( pass.val.length < 3 ){
            passError = true
        }
        if( pass.val !== confirmPass.val ) {
            confirmPassError = true
        }
        if( confirmPassError || passError ) {
            setPass({ ...pass, error : passError });
            setConfirmPass({ ...confirmPass, error : confirmPassError });
        }
        else {
            resetPassword(pass.val, resetToken);
        }
    }

    const enterKeyHandler = e => {
        if(e.keyCode === 13) {
            passwordHandler();
        }
    }

    React.useEffect(() => {
        if(resetSuccess){
            history.push('/')
        }
    },[resetSuccess, history])

    return (
               <FormContainer onKeyDown={enterKeyHandler} square elevation={0} variants={slideVariant} initial='start' animate='end'>
                    <img src={logo} alt='' style={{ width : '35px' }}/>
                    <Typography variant='subtitle2' style={{ marginTop : '10px' }}>
                        SMS Nepal
                    </Typography>
                    <Typography variant='body2' style={{ margin : '10px auto 15px' }}>
                        Change your password.
                    </Typography>
                    {resetError && <Alert severity="error" style={{ margin : '5px auto 15px' }}> 
                        Couldn't reset password right now. Please try again later
                    </Alert>}
                    <InputContainer style={{marginBottom : '25px'}}>
                        <StyledTextField
                                label="New Password"
                                variant="outlined"
                                fullWidth
                                type="password"
                                size = 'medium'
                                disabled={loader}
                                autoFocus
                                onChange={passChangeHandler}
                                error = {pass.error}
                                helperText = { pass.error ? <Error><WarningRoundedIcon /> <span> {pass.errorMsg} </span></Error> : '' }
                                value = {pass.val}
                        />
                    </InputContainer>
                    <InputContainer style={{marginBottom : '25px'}}>
                        <StyledTextField
                                label="Confirm Password"
                                variant="outlined"
                                fullWidth
                                type="password"
                                size = 'medium'
                                disabled={loader}
                                onChange={confirmPassChangeHandler}
                                error = {confirmPass.error}
                                helperText = { confirmPass.error ? <Error><WarningRoundedIcon /> <span> {confirmPass.errorMsg} </span></Error> : '' }
                                value = {confirmPass.val}
                         />
                    </InputContainer>
                    <div className='action'>
                        <Button color='primary' variant='contained' 
                                style={{ textTransform : 'capitalize' }}
                                disabled={loader}
                                disableElevation
                                onClick={passwordHandler}>
                                Change Password
                        </Button>
                    </div>      
               </FormContainer> 
    )
}

const mapStateToProps = state => {
    return {
        loader : state.resetPasswordReducer.emailLoader,
        resetSuccess : state.resetPasswordReducer.resetSuccess,
        resetError : state.resetPasswordReducer.resetError,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetPassword : (pass, resetToken) => dispatch(resetPassword(pass, resetToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);

const FormContainer = motion.custom(styled(Card)`
    &&& {
        height : 100%;
        width : 100%;
        display : flex;
        flex-direction : column;
        padding : 1.5rem;
        box-sizing : border-box;
        align-items : center;
        .action {
            align-self : flex-end;
        }
    }
`)
const InputContainer = styled.div`
   width : 100%;
    margin : 5px 0px;
    position : relative;
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
            margin-left : 0px;
        }
        `}
`
const Error = styled.span`
   display : flex;
   align-items : center;
   ${({ theme }) => `color : ${theme.palette.secondary.main}`};
   font-weight : 500;
   .MuiSvgIcon-root {
       font-size : 16px;
       margin-right : 5px;
   }
`  