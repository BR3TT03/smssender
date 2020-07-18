import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { Typography, Button, Box } from '@material-ui/core';
import SmsIcon from '@material-ui/icons/Sms';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import { connect } from 'react-redux';
import { login } from '../Store/Actions/authAction';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Link }  from 'react-router-dom';

function LoginForm({ open, handleClose, loader, login, switchFormHandler, error }) {
  
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState({ value : '', error : false, errorMsg : 'Enter a valid email address.' })
    const [password, setPassword] = useState({ value : '', error : false, errorMsg : 'Enter a valid password.' })

    const handleClickShowPassword = () => {
             setShowPassword(!showPassword);
      };
    
      const handleMouseDownPassword = (event) => {
            event.preventDefault();
      };

      const emailChangeHandler = e => {
        setEmail({ ...email, value : e.target.value, error : false })
    }
    const passwordChangeHandler = e => {
        setPassword({ ...password, value : e.target.value, error : false })
    }

    const formSubmitHandler = () => {
        let emailError = false;
        let passwordError = false;
        const emailRegx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if( password.value.length <= 3 ){
               passwordError = true;
          }
          if( emailRegx.test(email.value) ){
            emailError = false;
           }
            else {
                emailError = true;
           }
        if( passwordError || emailError ) {
                setEmail({ ...email, error : emailError })
                setPassword({ ...password, error :passwordError })
           }
        else {
            const data = {
                username : email.value,
                password : password.value
            }
            login(data);
        }
    }

    const enterPressHanlder = e => {
        if(e.keyCode === 13){
            formSubmitHandler();
        }
    }

    React.useEffect(()=>{
        if(error.value){
            setEmail( e => {
                return {
                    ...e,
                    error : true
                }
            })
            setPassword(p => {
                return {
                    ...p,
                    error : true
                }
            })
        }
   },[error])

    return (
        <>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open} style={{ outline : 'none' }}>
                    <LoginContainer onKeyDown={enterPressHanlder}>
                        { loader ? <div className='progress'><SigninProgressBar/></div>  : null }
                        <FormContainer>
                                <Typography variant='body1' align='center'>
                                        Welcome To
                                </Typography>   
                                <Typography variant='h6' align='center' color='primary'>
                                        <SmsIcon color='primary' style={{ marginRight : '10px', fontSize : '30px' }}/>
                                </Typography>   
                                <Typography variant='body2' align='center' gutterBottom>
                                        "SMS Nepal"
                                </Typography>  
                                <Typography variant='body1' align='center'>
                                        <span style={{ fontWeight: '500' }}>Log in to continue.</span>
                                </Typography>
                                <div style={{ padding : '20px 0px' }}>
                                    <InputContainer style={{marginBottom : '25px'}}>
                                            <StyledTextField
                                                    id="outlined-error-helper-text"
                                                    label="Email"
                                                    variant="outlined"
                                                    fullWidth
                                                    type="text"
                                                    size = 'medium'
                                                    autoFocus
                                                    disabled = {loader}
                                                    value = {email.value}
                                                    error = {email.error}
                                                    helperText = { email.error ? <Error><WarningRoundedIcon /> <span> {email.errorMsg} </span></Error> : '' }
                                                    onChange = {emailChangeHandler}
                                                />
                                        </InputContainer>    
                                        <InputContainer>
                                            <StyledTextField
                                                    id="outlined-error-helper-text standard-adornment-password"
                                                    label="Password"
                                                    variant="outlined"
                                                    fullWidth
                                                    disabled = {loader}
                                                    type = { showPassword ? 'text' : 'password' }
                                                    value = {password.value}
                                                    error = {password.error}
                                                    helperText = { password.error ? <Error><WarningRoundedIcon /> <span> {password.errorMsg} </span></Error> : '' }
                                                    onChange = {passwordChangeHandler}
                                                />
                                                <ShowHideBtn
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        >
                                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </ShowHideBtn>
                                        </InputContainer>
                                        <Action>
                                             <Link style={{ textDecoration : 'none' }}>
                                                   <Typography variant='subtitle2' color = 'primary' gutterBottom>
                                                        Forgot Password?
                                                    </Typography> 
                                             </Link>
                                            <Typography variant='caption' className='register-btn'>
                                                Not yet registered? 
                                                <Box color='primary.main' component='span' className='signup' 
                                                     onClick={switchFormHandler}> Sign up </Box>
                                                    now.
                                            </Typography>    
                                         </Action>     
                                        <Typography gutterBottom align='right'>
                                                    <Button 
                                                            variant="contained" 
                                                            color="primary" 
                                                            disableElevation 
                                                            disabled = {loader}
                                                            style={{ textTransform : 'capitalize', marginRight :'10px' }}
                                                            onClick={formSubmitHandler}>
                                                            Log in
                                                    </Button>
                                                    <Button 
                                                            variant="contained" 
                                                            disableElevation 
                                                            disabled = {loader}
                                                            style={{ textTransform : 'capitalize' }}
                                                            onClick={handleClose}>
                                                            Cancel
                                                    </Button>
                                        </Typography> 
                                </div>      
                        </FormContainer>    
                    </LoginContainer>
        </Fade>
      </Modal>
      </>
    )
}

const mapStateToProps = state => {
    return {
        loader : state.authReducer.loginLoader,
        error : state.authReducer.error
    }
}    

const mapDispatchToProps = dispatch => {
    return {
        login : (data) => dispatch(login(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

const LoginContainer = styled.div`
      box-sizing: border-box;  
      height : calc(100%);
      width : 500px;
      background : #fff;
      position : absolute;
      left : 50%;
      transform : translateX(-50%);
      @media( max-width : 768px ){
          width : 100vw;
      }
      .progress {
          width : 100%;
          background : red;
          position : fixed;
          top : 0px;
          left : 0px;
          z-index : 9999;
      }
`
const SigninProgressBar = styled(LinearProgress)`
        && {
            height : 4px;
        }
`

const FormContainer = styled.div`
    height : calc(100%);
    overflow : auto;
    box-sizing: border-box;  
    padding : 0px 30px;
    padding-top : 30px;
    @media( max-width : 768px ){
        padding : 30px 15px 0px;
    }
`
const InputContainer = styled.div`
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
            position : absolute;
            top : 100%;
            margin-top : 0px;
            margin-left : 0px;
        }
        `}
`

const ShowHideBtn = styled(IconButton)`
    &&& {
        position: absolute;
        right : 10px;
        top : 5px;
    }
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

const Action = styled.div`
   padding : 0px 5px;
   margin-bottom : 10px;
   .register-btn {
       color : #9e9e9e;
       font-weight : 400;
       word-spacing : 0px;
       .signup {
           display : inline;
            font-weight : 500;
           cursor: pointer;
       }
   }
`