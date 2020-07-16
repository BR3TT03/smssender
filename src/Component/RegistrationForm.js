import React, { useState } from 'react'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import { Typography, Button } from '@material-ui/core';
import SmsIcon from '@material-ui/icons/Sms';
import { connect } from 'react-redux';
import { register } from '../Store/Actions/authAction';
import LinearProgress from '@material-ui/core/LinearProgress';
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';

function RegistrationForm({ open, handleClose, register, loader }) {
  
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState({ value : '', error : false, errorMsg : 'Enter a valid name.' })
    const [email, setEmail] = useState({ value : '', error : false, errorMsg : 'Enter a valid email address.' })
    const [phone, setPhone] = useState({ value : '', error : false, errorMsg : 'Enter a valid phone number.' })
    const [password, setPassword] = useState({ value : '', error : false, errorMsg : 'Enter a valid password.' })

    const handleClickShowPassword = () => {
             setShowPassword(!showPassword);
      };
    
        const handleMouseDownPassword = (event) => {
                event.preventDefault();
        };

        const nameChangeHandler = e => {
            setName({ ...name, value : e.target.value, error : false })
        }
        const emailChangeHandler = e => {
           setEmail({ ...email, value : e.target.value, error : false })
        }
        const phoneChangeHandler = e => {
            setPhone({ ...phone, value : e.target.value, error : false })
        }
        const passwordChangeHandler = e => {
            setPassword({ ...password, value : e.target.value, error : false })
        }

      const formSubmitHandler = () => {
          let nameError = false;
          let emailError = false;
          let phoneError = false;
          let passwordError = false;
          const emailRegx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
          if( name.value.length <= 3 ){
              nameError = true;
          }
          if( password.value.length <= 3 ){
                 passwordError = true;
            }
            if( emailRegx.test(email.value) ){
                emailError = false;
            }
            else {
                emailError = true;
            }
        if( phone.value.length !== 10 ){
                phoneError = true;
            }
          
        if( nameError || passwordError || emailError || phoneError ) {
              setName({ ...name, error : nameError })
              setEmail({ ...email, error : emailError })
              setPhone({ ...phone, error : phoneError })
              setPassword({ ...password, error :passwordError })
          }
          else {
              register();
          }
      }

      const enterPressHanlder = e => {
          if(e.keyCode === 13){
              formSubmitHandler();
          }
      }

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
                        { loader ? <SigninProgressBar /> : null }
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
                                        <span style={{ fontWeight: '500' }}>Fill up the form to register.</span>
                                </Typography>
                                <div style={{ padding : '20px 0px' }}>
                                    <InputContainer style={{marginBottom : '25px'}}>
                                            <StyledTextField
                                                    label="Full name"
                                                    variant="outlined"
                                                    fullWidth
                                                    type="text"
                                                    size = 'medium'
                                                    autoFocus
                                                    disabled = {loader}
                                                    value = {name.value}
                                                    error = {name.error}
                                                    helperText = { name.error ? <Error><WarningRoundedIcon /> <span> {name.errorMsg} </span></Error> : '' }
                                                    onChange = {nameChangeHandler}
                                                />
                                        </InputContainer>    
                                        <InputContainer style={{marginBottom : '25px'}}>
                                            <StyledTextField
                                                    label="Email"
                                                    variant="outlined"
                                                    fullWidth
                                                    disabled = {loader}
                                                    type="email"
                                                    size = 'medium'
                                                    value = {email.value}
                                                    error = {email.error}
                                                    helperText = { email.error ? <Error><WarningRoundedIcon /> <span> {email.errorMsg} </span></Error> : '' }
                                                    onChange = {emailChangeHandler}
                                                />
                                        </InputContainer> 
                                        <InputContainer style={{marginBottom : '25px'}}>
                                            <StyledTextField
                                                    id="outlined-error-helper-text"
                                                    label="Phone number"
                                                    variant="outlined"
                                                    fullWidth
                                                    type="number"
                                                    size = 'medium'
                                                    disabled = {loader}
                                                    value = {phone.value}
                                                    error = {phone.error}
                                                    helperText = { phone.error ? <Error><WarningRoundedIcon /> <span> {phone.errorMsg} </span></Error> : '' }
                                                    onChange = {phoneChangeHandler}
                                                />
                                        </InputContainer> 
                                        <InputContainer>
                                            <StyledTextField
                                                    id="outlined-error-helper-text standard-adornment-password"
                                                    label="Password"
                                                    variant="outlined"
                                                    disabled = {loader}
                                                    fullWidth
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
                                        <Typography gutterBottom align='right'>
                                                    <Button 
                                                            variant="contained" 
                                                            color="primary" 
                                                            disableElevation 
                                                            style={{ textTransform : 'capitalize', marginRight :'10px' }}
                                                            onClick={formSubmitHandler}
                                                            disabled={loader}>
                                                            Register
                                                    </Button>
                                                    <Button 
                                                            variant="contained" 
                                                            disableElevation 
                                                            style={{ textTransform : 'capitalize' }}
                                                            onClick={handleClose}
                                                            disabled={loader}>
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
        loader : state.authReducer.registerLoader
    }
}    

const mapDispatchToProps = dispatch => {
    return {
        register : () => dispatch(register())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

const LoginContainer = styled.div`
      height : calc(100%);
      width : 500px;
      background : #fff;
      position : absolute;
      left : 50%;
      transform : translateX(-50%);
      overflow : auto;
      @media( max-width : 768px ){
          width : 100vw;
      }
`
const SigninProgressBar = styled(LinearProgress)`
        position : absolute;
        && {
            height : 3px;
        }
`

const FormContainer = styled.div`
    padding : 10px 30px;
    padding-top : 50px;
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