import React from 'react'
import styled from 'styled-components';
import Navigation from '../Component/Navigation';
import Homepage from '../Component/Homepage';
import {  Avatar, Typography, IconButton, SwipeableDrawer } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import Setting from '../Component/Setting';
import Subscription from '../Component/Subscription';
import { connect } from 'react-redux';
import  { loadUser } from '../Store/Actions/userAction';
import Skeleton from '@material-ui/lab/Skeleton';
import MenuIcon from '@material-ui/icons/Menu';
import Media from 'react-media';

function Dashboard({ loadUser, userLoader, user }) {

    const [openDrawer, setOpenDrawer] = React.useState(false);
    const location = useLocation();

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer)
    }

    React.useEffect(() => {
        loadUser();
    }, [loadUser])

    return (
        <Container>
            <Media query={{ minWidth: 992 }}>
                {matches =>
                    matches ? (
                        <Navigation itemClicked={toggleDrawer}/>
                    ) : (
                    <SwipeableDrawer
                            open={openDrawer}
                            onOpen={() => setOpenDrawer(true)}
                            onClose={toggleDrawer}
                        >
                            <MobileNav>
                                <Navigation itemClicked={toggleDrawer}/>
                            </MobileNav> 
                    </SwipeableDrawer>   
                    )
                }
            </Media>
                <Content>
                    <AppBar>
                            <Hamburger onClick={toggleDrawer}>
                                <MenuIcon style={{ color : '#fff'  }}/>  
                            </Hamburger>
                            <Typography variant='subtitle2' style={{ flex : '1', color : '#fff' }}>
                                { location && location.pathname.split('/')[1].toUpperCase() }
                            </Typography>   
                            {!userLoader ? 
                                <StyledAvatar color='success'>
                                    { user.name && user.name.charAt(0).toUpperCase() }
                                </StyledAvatar>
                                : 
                                <Skeleton variant="circle" width={35} height={35} 
                                        style={{ background : 'rgba(255, 255, 255, 0.1)' }}
                                />}
                            <IconButton>
                                <MoreVertIcon style={{ color : '#fff'  }}/>  
                            </IconButton>  
                    </AppBar>
                    <Switch>
                        <Route path='/dashboard'>
                                <Homepage />
                         </Route>   
                        <Route path='/setting' component={Setting}/>
                        <Route path='/subscription' component={Subscription}/>
                        <Redirect to='/dashboard'/>
                     </Switch>
               </Content>     
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        userLoader : state.userReducer.userLoader,
        user : state.userReducer.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUser : () => dispatch(loadUser())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const Container = styled.div`
    position : relative;
    display : flex;
    width : 100%;
    box-sizing : border-box;
    height : ${window.innerHeight}px;
`
const Content = styled.div`
    flex : 1;
    height : 100%;
`
const AppBar = styled.div`
    height : 56px;
    ${({ theme }) => `background :  ${theme.palette.primary.main}`};
    display : flex;
    box-sizing : border-box;
    padding : 20px 30px;
    align-items : center;
    @media( max-width : 992px) {
        padding : 20px 5px;
    }
`

const StyledAvatar = styled(Avatar)`
    &&& {
        ${({ theme }) => `background :  ${theme.palette.success.main}`};
        height : 35px;
        width : 35px
    }
`
const MobileNav = styled.div`
   height : 100%;
   width : 260px;
`
const Hamburger = styled(IconButton)`
   @media( min-width : 992px ){
       &&& {
           display : none
       }
   }   
`