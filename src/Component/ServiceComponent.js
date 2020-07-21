import React from 'react'
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

function ServiceComponent() {
    return (
        <Container>
              <Service style={{ borderRight : '1px solid #fb8c00' }}>
                    <Typography variant='body1' align='center' style={{ fontWeight : '500', marginBottom : '10px' }}>
                            Bulk Sms
                     </Typography> 
                     <div className='serviceText'>
                         A technology lets you send ,hundreds,even millions of SMS at a time to phone numbers with 1 click.
                      </div>     
              </Service>
              <Service  style={{ borderRight : '1px solid #fb8c00' }}>
                    <Typography variant='body1' align='center' style={{ fontWeight : '500', marginBottom : '10px' }}>
                         COST-EFFECTIVE
                     </Typography> 
                     <div className='serviceText'>
                            Bulk sms messages is the best way to grow up your business as open rates of SMS promotions as high as 98%.
                      </div>     
              </Service> 
              <Service  style={{ borderRight : '1px solid #fb8c00' }}>
                    <Typography variant='body1' align='center' style={{ fontWeight : '500', marginBottom : '10px' }}>
                         COST-EFFECTIVE
                     </Typography> 
                     <div className='serviceText'>
                            Bulk sms messages is the best way to grow up your business as open rates of SMS promotions as high as 98%.
                      </div>     
              </Service>  
              <Service>
                    <Typography variant='body1' align='center' style={{ fontWeight : '500', marginBottom : '10px' }}>
                         COST-EFFECTIVE
                     </Typography> 
                     <div className='serviceText'>
                            Bulk sms messages is the best way to grow up your business as open rates of SMS promotions as high as 98%.
                      </div>     
              </Service>         
        </Container>
    )
}

export default ServiceComponent;

const Container = styled.div`
    display : flex;
    justify-content : center;
    margin-bottom : 20px;
    @media (max-width : 992px) {
        flex-direction : column;
    }
`
const Service = styled.div`
    box-sizing : border-box;
    padding : 20px;
    margin-top : 30px;
    .serviceText {
        font-size : 14px;
        text-align : center;
        color : #757575;
    }
`



