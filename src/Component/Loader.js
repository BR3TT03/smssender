import React from 'react'
import styled from 'styled-components';
import { LinearProgress } from '@material-ui/core';

function Loader() {
    return (
        <Container>
            <LinearProgress color='primary'/>
        </Container>
    )
}

export default Loader;

const Container = styled.div`
   height : ${window.innerHeight}px;
   width : 100vw;
   position : fixed;
   top : 0px;
   left : 0px; 
   background : rgba(0, 0, 0, 0.2);
   z-index : 99;
`
