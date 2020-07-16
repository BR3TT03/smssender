import React from 'react'
import styled from 'styled-components';
import bg from '../Assets/bg-icon.svg';
import { Grid, Typography } from '@material-ui/core';
import Message from './Message';
import HelpBox from './HelpBox'

function Homepage() {
    return (
        <Container>
              <Body>
                    <div className= 'top'>
                        <Typography variant='h4' style={{ color : '#fff', fontWeight: '700' }}>
                            Get started
                        </Typography> 
                        <Typography variant='subtitle2' style={{ color : '#fff', fontWeight : '400', marginTop : '5px' }}>
                            We help you to send bulk sms more efficiently.
                        </Typography>
                            <div className='statCard'>
                                        <div className='title'>
                                            <Typography variant='caption'  style={{  fontWeight : '400', color : '#eee' }}>
                                                Statistics
                                            </Typography>  
                                            <Typography variant='subtitle2' style={{  fontWeight : '400' }}>
                                                Total Message
                                            </Typography>          
                                        </div>    
                                        <div>
                                            <Typography variant='subtitle2' className='number' component='div' align='right' style={{ fontFamily : 'Kanit' }}>
                                                100
                                            </Typography> 
                                        </div>    
                              </div>   
                     </div>
                     <Grid container>
                            <StyledGrid item xs={9}>
                                   <Message />
                            </StyledGrid>  
                            <StyledGrid item xs={3}>
                                   <HelpBox />
                            </StyledGrid>  
                    </Grid>  
              </Body>
        </Container>
    )
}

export default Homepage;

const Container = styled.div`
    height : 100%;
    overflow-y : scroll;
    flex : 1;
    background : #f5f5f5;
`
const Body = styled.div`
     ${({ theme }) => `background :  ${theme.palette.primary.main}`};
     position : relative;
     height : 180px;
     width : 100%;
     background-image : url(${bg});
     background-size: 40%;
     padding : 10px 30px;
     box-sizing : border-box;
     .top {
         position : relative;
             .statCard  {
                  color : #fff ;
                  box-sizing : border-box;
                  padding : 5px 10px;
                  display : flex;
                  height : 100%;  
                  position : absolute;
                  right : 0px;
                  top : 0px;
                  width : 200px;
                  background : #fff;
                  border-radius : 3px;
                  justify-content : space-between;
                  align-items : flex-end;
                  background: #F27121;
                  .title {
                      height : 100%;
                      flex : 1;
                      display : flex;
                      flex-direction : column;
                      justify-content : space-evenly;
                  }
                  .number {
                      font-size : 25px;
                  }
         }
     }
`

const StyledGrid = styled(Grid)`
    &&& {
        box-sizing : border-box;
        margin-top : 20px;
    }
`