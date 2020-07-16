import React, { useState } from 'react'
import styled from 'styled-components';
import curve from '../Assets/bg.svg';
import cartoon from '../Assets/cartoon.png';
import { Grid, Typography, Button } from '@material-ui/core';
import ServiceComponent from '../Component/ServiceComponent';
import SmsIcon from '@material-ui/icons/Sms';
import RegistrationForm from '../Component/RegistrationForm';
import PricingCard from '../Component/PricingCard';
import LoginForm from '../Component/LoginForm';

function LandingPage() {

    const [openRegisterForm, setOpenRegisterForm] = useState(false);
    const [openLoginForm, setOpenLoginForm] = useState(false);

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

    return (
        <Container>
             <RegistrationForm open={openRegisterForm} handleClose={handleCloseRegisterForm} handleOpen= {handleOpenRegisterForm} />
             <LoginForm open={openLoginForm} handleClose={handleCloseLoginForm} handleOpen= {handleOpenLoginForm} />
              <AppBar>
                    <SmsIcon style={{ color : '#fff', marginRight : '10px' }}/>
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
        </Container>    
    )
}

export default LandingPage;

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
    }
`