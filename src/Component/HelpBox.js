import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'

function HelpBox() {
    return (
        <Container>
             <Header>
                <Typography variant='subtitle2' color='textPrimary' style={{ fontSize : '16px' }}>
                        Quick start
                </Typography>  
             </Header>
             <Body>   
                <Typography variant='subtitle2' style={{ fontSize : '14px', fontWeight : '400', color : '#757575' }}>
                        Loremipsum Text Loremipsum Text 
                        Loremipsum Text Loremipsum Text 
                        Loremipsum Text Loremipsum Text 
                        Loremipsum Text Loremipsum Text 
                </Typography>  
            </Body>    
        </Container>
    )
}

export default HelpBox;

const Container = styled.div`
    box-sizing : border-box;
    background : #fff;
    margin : 0px 10px;
    border-radius : 10px;
    box-shadow: rgba(53, 64, 82, 0.05) 1px 0px 14px 0px;
    width : 100%;
`
const Header = styled.div`
   height : 50px;
   padding : 0px 20px;
   display : flex;
   flex-direction : column;
   justify-content : center;
`
const Body = styled.div`
   padding : 0px 20px;
   padding-bottom : 20px;
`