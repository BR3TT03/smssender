import React, { useState } from 'react'
import styled from 'styled-components';
import curve from '../Assets/bg.svg';
import cartoon from '../Assets/cartoon.png';
import { Grid, Typography, Button } from '@material-ui/core';
import ServiceComponent from '../Component/ServiceComponent';
import RegistrationForm from '../Component/RegistrationForm';
import PricingCard from '../Component/PricingCard';
import LoginForm from '../Component/LoginForm';
import { useLocation , useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import { verifyEmail } from '../Store/Actions/authAction';
import Loader from '../Component/Loader';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { SET_SUCCESS, SET_ERROR } from '../Store/Actions/actionTypes';
import logo from '../Assets/logo.png'

function LandingPage({ verifyEmail, verifyLoader, success, setSuccess, error, setError }) {

    const [openRegisterForm, setOpenRegisterForm] = useState(false);
    const [openLoginForm, setOpenLoginForm] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const location = useLocation()
    const history = useHistory()

    const handleCloseSnackBar = (event, reason) => {
     if (reason === 'clickaway') {
       return;
     }
     setOpenSnackbar(false);
   };

   const handleCloseErrorSnackBar = (event, reason) => {
     if (reason === 'clickaway') {
       return;
     }
     setOpenErrorSnackbar(false);
   };

    const handleOpenLoginForm = () => {
       setOpenLoginForm(true);
     };

     const handleCloseLoginForm = () => {
       setOpenLoginForm(false);
     };  

    const handleOpenRegisterForm = () => {
       setOpenRegisterForm(true);
     };

     const handleCloseRegisterForm = () => {
       setOpenRegisterForm(false);
     };  

     React.useEffect(() => {
          if(location.search){
                if(location.search.split('=')[0] === '?token') {
                    const token = location.search.split('=')[1];
                    verifyEmail(token);
                    history.push('/');
                }
          }
          
     }, [location, verifyEmail, history])

     const switchFormHandler = () => {
          setOpenLoginForm(false);
          setOpenRegisterForm(true);
     }

     React.useEffect(() => {
          if(success.value){
               setOpenSnackbar(true);
               setSuccess();
          }
          if(error.value){
               setOpenErrorSnackbar(true);
               setError();
          }
     },[success, setSuccess, error, setError])

    return (
        <Container>
             {verifyLoader && <Loader /> }
             <RegistrationForm open={openRegisterForm} handleClose={handleCloseRegisterForm} handleOpen= {handleOpenRegisterForm} />
             <LoginForm switchFormHandler={switchFormHandler} open={openLoginForm} handleClose={handleCloseLoginForm} handleOpen= {handleOpenLoginForm} />
              <AppBar>
                    <img src={logo} style={{ color : '#fff',width : '25px', marginRight : '10px' }} alt=''/>
                    <StyledTypography>
                         SMS Nepal
                    </StyledTypography>     
                    <Login size='medium' onClick={handleOpenLoginForm}>
                              Login
                    </Login>   
                    <Login size='medium'>
                              Contact Us
                    </Login>    
               </AppBar>   
              <TopSection>
                    <Grid container style={{ height : '100%' }}>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                             <Card>
                                   <div className='text'>
                                       <Typography variant='h4' style={{ marginBottom : '10px' }}>
                                                  Bulk SMS solution
                                        </Typography>   
                                        <Typography variant='subtitle2' style={{ fontWeight : '400', marginBottom : '20px' }}>
                                                  SMS Nepal is nepal's no.1 fastest sms sending website.Loremipsum dollar
                                                  Loremipsum dollar Loremipsum dollar  Loremipsum dollar Loremipsum dollarLoremipsum dollar 
                                                  Loremipsum dollar Loremipsum dollar Loremipsum dollar
                                        </Typography>   
                                        <RegisterButton variant='contained' disableElevation onClick={handleOpenRegisterForm}>
                                                  Register
                                         </RegisterButton>    
                                    </div>    
                             </Card>   
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                             <Card className='desktop-only' style={{ background : '' }}>
                                   <img src={cartoon} alt=''/>
                             </Card>   
                        </Grid>
                     </Grid>   
               </TopSection>
               <SvgCurve>
                    <img src={curve} alt=''/>
               </SvgCurve> 
               <Typography variant='h4' align='center' color='primary'>
                              Our Services
               </Typography> 
               <Services>
                    <ServiceComponent />
                </Services>  
                <Typography variant='h4' align='center' color='primary'>
                              Our Packages
               </Typography>    
                <Pricing>
                      <PricingCard /> 	
                </Pricing>  
                <Snackbar open={openSnackbar} 
                          autoHideDuration={3000} 
                          onClose={handleCloseSnackBar}
                          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={handleCloseSnackBar} severity="success">
                         {success.msg}
                    </Alert>
                </Snackbar>  
                <Snackbar open={openErrorSnackbar} 
                          autoHideDuration={5000} 
                          onClose={handleCloseErrorSnackBar}
                          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={handleCloseErrorSnackBar} severity="error">
                         {error.msg}
                    </Alert>
                </Snackbar>    
        </Container>    
    )
}

const mapStateToProps = state => {
     return {
         verifyLoader : state.authReducer.verifyingLoader,
         success : state.authReducer.success,
         error : state.authReducer.error
     }
}

const mapDispatchToProps = dispatch => {
     return {
          verifyEmail : token => dispatch(verifyEmail(token)),
          setSuccess : () => dispatch({ type : SET_SUCCESS }),     
          setError : () => dispatch({ type : SET_ERROR }),     
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

const Container = styled.div`
     width : 100%;
`

const AppBar = styled.div`
    height : 56px;
    ${({ theme }) => `background : ${theme.palette.primary.main}`};
    display : flex;
     box-sizing : border-box;
     padding : 20px;
     align-items : center;
`

const TopSection = styled.div`
   height : 50vh;
   ${({ theme }) => `background : ${theme.palette.primary.main}`}
`
const SvgCurve = styled.div`
   position : relative;
   margin-top : -3px;
`
const Card = styled.div`
   height : 100%;
   position : relative;
   &.desktop-only {
        @media( max-width : 992px ) {
             display : none 
            
        }    
   }
   .text {
        position : absolute;
        top : 60%;
        left : 50%;
        width : 70%;
        transform : translate(-50%, -50%);
        @media( max-width : 768px ) {
               top : 100%;
        }
        color : #fff;
        .MuiTypography-h4 {
          @media( max-width : 768px ) {
               font-size : 20px;
               font-weight : 500;
          }
        }
   }
   img {
        position : absolute;
        height : 400px;
        width : auto;
        z-index : 1;
        left : 50%;
        top : 70%;
        transform : translate(-50%, -50%);
   }
`
const RegisterButton = styled(Button)`
    &&& {
        background : #fff;
        ${({ theme }) => `color : ${theme.palette.primary.main}`};
    }
`
const Services = styled.div`
        margin-bottom : 40px;
`
const StyledTypography = styled(Typography)`
   &&& {
     font-family: 'Kanit', sans-serif;
     color : #fff;
     flex : 1;
     font-size : 20px;
   }
  
`
const Login = styled(Button)`
    &&& {
         color : #fff;
    }
`
const Pricing = styled(Grid)`
    &&& {
         display : flex;
         justify-content : center;
         margin : 20px auto;
    }
`