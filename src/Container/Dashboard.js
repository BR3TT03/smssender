import React from 'react'
import styled from 'styled-components';
import Navigation from '../Component/Navigation';
import Homepage from '../Component/Homepage';
import {  Avatar, Typography, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Switch, Route, useLocation } from 'react-router-dom';
import Setting from '../Component/Setting';
import Subscription from '../Component/Subscription';

function Dashboard() {

    const location = useLocation();

    return (
        <Container>
                <Navigation />
                <Content>
                    <AppBar>
                            <Typography variant='subtitle2' style={{ flex : '1', color : '#fff' }}>
                                { location && location.pathname.split('/')[1].toUpperCase() }
                            </Typography>   
                            <StyledAvatar color='success'>
                                A
                            </StyledAvatar> 
                            <IconButton>
                                <MoreVertIcon style={{ color : '#fff'  }}/>  
                            </IconButton>          
                    </AppBar>
                    <Switch>
                        <Route path='/setting' component={Setting}/>
                        <Route path='/subscription' component={Subscription}/>
                        <Route path='/dashboard' component={Homepage} exact/>
                     </Switch>
               </Content>     
        </Container>
    )
}



export default Dashboard;

const Container = styled.div`
    position : relative;
    display : flex;
    height : ${window.innerHeight}px;
`
const Content = styled.div`
    flex : 1;
    height : calc(100% - 56px);
`
const AppBar = styled.div`
    height : 56px;
    ${({ theme }) => `background :  ${theme.palette.primary.main}`};
    display : flex;
    box-sizing : border-box;
    padding : 20px 30px;
    align-items : center;
`

const StyledAvatar = styled(Avatar)`
    &&& {
        ${({ theme }) => `background :  ${theme.palette.success.main}`};
        height : 35px;
        width : 35px
    }
`