import React from 'react'
import styled from 'styled-components';
import { Card, Typography, TextField, Button } from '@material-ui/core';
import logo from '../Assets/logo.png'
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import { sendEmailToReset } from '../Store/Actions/resetPasswordAction';
import { connect } from 'react-redux';
import { Alert } from '@material-ui/lab'

function ForgotPasswordForm({ sendEmailToReset, loader, error, emailSendSuccess }) {

    const [email, setEmail] = React.useState({ value : '', error : false, errorMsg : 'Enter a valid email address.' });

    const emailChangeHandler = e => {
        setEmail({ ...email, value : e.target.value, error : false })
    }

    const enterKeyHandler = e => {
        if(e.keyCode === 13){
            verifyEmailHandler();
        }
    }

    const verifyEmailHandler = () => {
        let emailError = false;
        const emailRegx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if( emailRegx.test(email.value) ){
            emailError = false;
        }
        else {
            emailError = true;
        }
        if(emailError){
            setEmail({ ...email, error : emailError })
        }
        else {
           sendEmailToReset(email.value);
        }
    }

    React.useEffect(() => {
        if(error) {
            setEmail( prev => {
                return {
                    ...prev,
                    error : true
                }
            })
        }
    },[error])

    return (
               <FormContainer square elevation={0}>
                    <img src={logo} alt='' style={{ width : '35px' }}/>
                    <Typography variant='subtitle2' style={{ marginTop : '10px' }}>
                        SMS Nepal
                    </Typography>
                    <Typography variant='h5' style={{ marginTop : '10px' }}>
                        Password Recovery
                    </Typography>
                    <Typography variant='body2' style={{ marginTop : '10px' }}>
                        Enter your email address to recover password.
                    </Typography>
                    { emailSendSuccess && <StyledAlert severity="success" style={{ marginTop : '10px' }}>
                          Password reset link has been sucessfully sent to your email.
                            <div className='emailBtn'>  
                                <a href={email.value && `https://${email.value.substring(email.value.indexOf('@') + 1, email.value.length)}`} 
                                        target ='_blank'
                                        rel="noopener noreferrer"
                                        style={{ textDecoration : 'none' }}>
                                                <Button size='small'
                                                        disableElevation
                                                        > 
                                                        check mail
                                                </Button>  
                                </a>
                            </div> 
                     </StyledAlert>}
                    <InputContainer style={{marginBottom : '25px'}}>
                        <StyledTextField
                                id="outlined-error-helper-text"
                                label="Email"
                                variant="outlined"
                                fullWidth
                                type="text"
                                onKeyDown = {enterKeyHandler}
                                size = 'medium'
                                autoFocus
                                disabled={loader}
                                value={email.value}
                                error = {email.error}
                                helperText = { email.error ? <Error><WarningRoundedIcon /> <span> {email.errorMsg} </span></Error> : '' }
                                onChange = {emailChangeHandler}
                        />
                    </InputContainer>
                    <div className='action'>
                        {!emailSendSuccess && <Button color='primary' variant='contained' 
                                disableElevation
                                disabled={loader}
                                onClick={verifyEmailHandler} 
                                >
                                Next
                        </Button>}
                    </div>      
               </FormContainer> 
    )
}

const mapStateToProps = state => {
    return {
        loader : state.resetPasswordReducer.emailLoader,
        error : state.resetPasswordReducer.emailError,
        emailSendSuccess : state.resetPasswordReducer.emailSendSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendEmailToReset : (email) => dispatch(sendEmailToReset(email))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);

const FormContainer = styled(Card)`
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
`
const InputContainer = styled.div`
   width : 100%;
    margin : 20px 0px;
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
const StyledAlert = styled(Alert)`
    &&& {
        padding-top : 5px;
        padding-bottom : 0px;
        .emailBtn {
            display : flex;
            width : 100%;
            justify-content : flex-start;
            margin-top : 3px;
        }
    }
`