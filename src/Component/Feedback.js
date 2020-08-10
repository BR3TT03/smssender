import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Typography, Button, TextField, CircularProgress } from '@material-ui/core'
import logo from '../Assets/logo.png'
import { connect } from 'react-redux'
import { sendFeedBack, setUserSuccess } from '../Store/Actions/userAction'
import { motion } from 'framer-motion'

const slideVariant = {
    from : {
        opacity : 0,
        y : '-100%'
    },
    to : {
        opacity : 1,
        y : 0,
        transition : {
            type : 'tween',
            duration : 0.3,
            ease : 'easeOut'
        }
    }
}

function Feedback({ email, success, sendFeedBack, setUserSuccess, feedbackLoader, handleCloseFeedBack }) {

    const [mail, setMail] = useState({ value : '', error : false });
    const [message, setMessage] = useState({ value : '', error : false });

    const mailChangeHandler = e => {
        setMail({ ...mail, value : e.target.value, error : false })
    }

    const messageChangeHandler = e => {
        setMessage({ ...message, value : e.target.value, error : false })
    }

    const sendMailHandler = () => {
        let mailError = false;
        let messageError = false;
        const emailRegx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if( emailRegx.test(mail.value) ){
            mailError = false;
        }
        else {
            mailError = true;
        }
        if( message.value.length <10 ) {
            messageError = true;
        }
        if(mailError || messageError) {
            setMail({ ...mail, error : mailError });
            setMessage({ ...message, error : messageError })
        }
        else {
            sendFeedBack(mail.value, message.value);
        }
    }

    const returnKeyHandler = e => {
        if(e.keyCode === 13) {
            sendMailHandler();
        }
    }

    useEffect(() => {
        setMail(prev => ({ ...prev, value : email }));
    }, [email])

    useEffect(() => {
        if(success.value){
            setUserSuccess();
            handleCloseFeedBack();
        }
    }, [success, setUserSuccess, handleCloseFeedBack])

    return (
        <Container>
             <ModalForm variants={slideVariant} initial='from' animate='to'>
                <Header>
                    <Typography variant='subtitle2' color='textPrimary' style={{ fontSize : '16px' }}>
                          Send Feedback  
                    </Typography>
                    <img src={logo} alt='' style={{ width : '30px' }}/>
                </Header>
                <Body>
                    <InputContainer>
                        <StyledTextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                type="email"
                                disabled={feedbackLoader}
                                size = 'small'
                                value = {mail.value}
                                onChange = {mailChangeHandler}
                                onKeyDown = {returnKeyHandler}
                                error={mail.error}
                                helperText={ mail.error ? 'Enter a valid email address.' : '' }
                            /> 
                    </InputContainer>
                    <InputContainer>
                        <StyledTextField
                                    id="outlined-multiline-static"
                                    label="Comments"
                                    multiline
                                    variant="outlined"
                                    rows={4}
                                    disabled={feedbackLoader}
                                    fullWidth
                                    autoFocus
                                    onKeyDown = {returnKeyHandler}
                                    value={message.value}
                                    onChange={messageChangeHandler}
                                    error={message.error}
                                    helperText={ message.error ? 'Message must be of 10 character long.' : '' }
                                />
                    </InputContainer>
                    <Typography variant='subtitle2' color='textSecondary' style={{ fontSize : '14px', fontWeight : '400' }}>
                          You can send feedback regarding our features and services. Your feedback will help us
                          to build our system that will have a better performance.  
                    </Typography>
                </Body>
                <Footer>
                     {feedbackLoader && <CircularProgress size={25}/>}
                      <Button variant='contained' size='small' color='primary' disableElevation
                              onClick={sendMailHandler}  
                              disabled={feedbackLoader}
                              style={{ margin : '0px 7px', textTransform : 'capitalize' }}> 
                           Send
                      </Button>  
                      <Button variant='contained' size='small' disableElevation
                              disabled={feedbackLoader}
                              onClick={handleCloseFeedBack}
                              style={{ textTransform : 'capitalize' }}> 
                           Cancel
                      </Button> 
                </Footer>
             </ModalForm>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
       email : state.userReducer.user.email,
       success : state.userReducer.success,
       feedbackLoader : state.userReducer.feedbackLoader,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendFeedBack : (email, message) => dispatch(sendFeedBack(email,message)),
        setUserSuccess : () => dispatch(setUserSuccess())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
const Container = styled.div`
   height : ${window.innerHeight}px;
   width : 100vw;
   background : rgba(0, 0, 0, 0.4);
   box-sizing : border-box;
   position : absolute;
   z-index : 1200;
   top : 0;
   left : 0;
   display : flex;
   align-items : center;
   justify-content : center; 
    @media(max-width : 992px) {
       height : ${window.innerHeight}px;
       width : 100vw;
       border-radius : 0px;
   }
`;
const ModalForm = styled(motion.div)`
   height : 90%;
   width : 400px;
   box-sizing : border-box;
   background : #fff;
   border-radius : 7px;
   display : flex;
   flex-direction : column;
   @media(max-width : 992px) {
       height : ${window.innerHeight}px;
       width : 100vw;
       border-radius : 0px;
   }
`;
const Header = styled.div`
   height : 60px;
   padding : 0px 20px;
   display : flex;
   box-sizing : border-box;
   align-items : center;
   justify-content : space-between;
   border-bottom : 1px solid rgba(0, 0, 0, 0.12);
`
const Body = styled.div`
   padding : 20px;
   flex : 1;
   box-sizing : border-box;
`;
const Footer = styled.div`
   height : 60px;
   padding : 0px 20px;
   display : flex;
   box-sizing : border-box;
   align-items : center;
   justify-content : flex-end;
   border-top : 1px solid rgba(0, 0, 0, 0.12);
`
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