import React from 'react'
import styled from 'styled-components'
import { Grid } from '@material-ui/core';
import paperplane from '../Assets/paperplane.svg'
import plane from '../Assets/plane.svg'
import rocket from '../Assets/rocket.svg'

function PricingCard() {
    return (
        <GridContainer container justify='center'>
          <StyledGrid item xs={12} sm={5} md={5} lg={3} colorprops='success'>
                <div className='banner'>
                     <span>
                         Free
                     </span>       
                 </div>
                 <div className='svgIcon'>
                        <img src={paperplane} alt=''/>
                 </div>    
                 <div className = 'cost'>
                        <span>
                            Rs
                        </span>
                        <span>
                                0
                        </span> 
                        <span>
                                /100sms
                        </span>  
                 </div>   
                 <ul className='desc'>
                    <li> Loremipsum text Loremipsum text Loremipsum text </li>
                    <li> Loremipsum text Loremipsum text Loremipsum text </li>
                 </ul>       
           </StyledGrid> 
           <StyledGrid item xs={12} sm={5} md={5} lg={3} colorprops='primary'>
                <div className='banner'>
                     <span>
                         Starter
                     </span>       
                 </div>
                 <div className='svgIcon'>
                        <img src={plane} alt=''/>
                 </div>    
                 <div className = 'cost'>
                        <span>
                            Rs
                        </span>
                        <span>
                                1
                        </span> 
                        <span>
                                /sms
                        </span>  
                 </div>   
                 <ul className='desc'>
                    <li> Loremipsum text Loremipsum text Loremipsum text </li>
                    <li> Loremipsum text Loremipsum text Loremipsum text </li>
                 </ul>       
           </StyledGrid>  
           <StyledGrid item xs={12} sm={5} md={5} lg={3} colorprops='secondary'>
                <div className='banner'>
                     <span>
                         Pro
                     </span>       
                 </div>
                 <div className='svgIcon'>
                        <img src={rocket} alt=''/>
                 </div>    
                 <div className = 'cost'>
                        <span>
                            Rs
                        </span>
                        <span>
                                0.75
                        </span> 
                        <span>
                                /sms
                        </span>  
                 </div>   
                 <ul className='desc'>
                    <li> Loremipsum text Loremipsum text Loremipsum text </li>
                    <li> Loremipsum text Loremipsum text Loremipsum text </li>
                 </ul>       
           </StyledGrid>      
        </GridContainer>
    )
}

export default PricingCard;

const GridContainer = styled(Grid)`
    && {
        box-sizing : border-box;
    }
`

const StyledGrid = styled(Grid)`
   &&& {
    box-shadow: rgba(53, 64, 82, 0.05) 1px 0px 14px 0px;
   margin : 5px 15px;    
   height : 400px;
   background : #fff;
   box-sizing : border-box;
   border-radius : 7px;
   overflow : visible;
   .svgIcon {
       margin : 20px auto;
       display : flex;
       justify-content : center;
       img {
           height : 60px;
           width :auto;
       }
   }
   .banner {
                display : flex;
                justify-content : center;
                align-items : center;    
                height : 50px;
                ${({ theme, colorprops }) => 
                `background : ${theme.palette[colorprops].main}`};
                margin-top : 20px;
                position : relative;
                &::before {
                    content : '';
                    position : absolute;
                    top : 0px;
                    left : -10px;
                    height : 100%;
                    width : 10px;
                    ${({ theme, colorprops }) => 
                        `background : ${theme.palette[colorprops].main}`};
                    z-index : 999;
                    border-radius : 5px 0px 0px 5px;
                }
                &::after {
                    content : '';
                    position : absolute;
                    top : 0px;
                    right : -10px;
                    height : 100%;
                    width : 10px;
                    ${({ theme, colorprops }) => 
                        `background : ${theme.palette[colorprops].main}`};
                    border-radius : 0px 5px 5px 0px;
                    z-index : 999;
                }
                span {
                    font-family: 'Kanit', sans-serif;
                    font-weight : 500;
                    font-size : 20px;
                    color : #fff;    
                }
            } 
      .cost {
          display : flex;
          justify-content : center;
          align-items : center;
          height : 70px;
          span {
              height : 100%;
              display : flex;
              &:nth-child(1) {
                  flex : 1;
                  justify-content : flex-end;
              }
              &:nth-child(2) {
                  justify-content : center;
                  align-items : center;
                  font-size : 70px;
              }
              &:nth-child(3) {
                  flex : 1;
                  justify-content : flex-start;
                  align-items : flex-end;
                }
            }
        }
        .desc {
            margin-top : 30px;
            li {
                font-size : 14px;
                padding : 0px 10px;
            }
        }      
   }
`
