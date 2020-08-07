import React from 'react'
import styled from 'styled-components';
import Navigation from '../Component/Navigation';
import Homepage from '../Component/Homepage';
import {  Avatar, Typography, IconButton, SwipeableDrawer, Snackbar } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import Setting from '../Component/Setting';
import Subscription from '../Component/Subscription';
import { connect } from 'react-redux';
import  { loadUser, setUserError } from '../Store/Actions/userAction';
import Skeleton from '@material-ui/lab/Skeleton';
import MenuIcon from '@material-ui/icons/Menu';
import Media from 'react-media';
import Alert from '@material-ui/lab/Alert'
import ManageGroups from '../Component/ManageGroups';
import ManageApi from '../Component/ManageApi';

function Dashboard({ loadUser, userLoader, user, success, error, setUserSuccess, setUserError }) {

    const [openDrawer, setOpenDrawer] = React.useState(false);
    const location = useLocation();
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = React.useState(false);

    const toggleDrawer = () => {
        setOpenDrawer(!openDrawer)
    }

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

    React.useEffect(() => {
        loadUser();
    }, [loadUser])

    React.useEffect(() => {
        if(success.value){
             setOpenSnackbar(true);
        }
        if(error.value){
            setOpenErrorSnackbar(true);
            setUserError();
       }
   },[success, error, setUserSuccess, setUserError])

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
                        <Route path='/manage-groups' component={ManageGroups}/>
                        <Route path='/manage-api' component={ManageApi}/>
                        <Redirect to='/dashboard'/>
                     </Switch>
               </Content>   
               <Snackbar open={openSnackbar} 
                          autoHideDuration={5000} 
                          onClose={handleCloseSnackBar}
                          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={handleCloseSnackBar} severity="success">
                         {success.label}
                    </Alert>
                </Snackbar>   
                <Snackbar open={openErrorSnackbar} 
                          autoHideDuration={5000} 
                          onClose={handleCloseErrorSnackBar}
                          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                    <Alert onClose={handleCloseErrorSnackBar} severity="error">
                         {error.label}
                    </Alert>
                </Snackbar>  
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        userLoader : state.userReducer.userLoader,
        user : state.userReducer.user,
        success : state.userReducer.success,
        error : state.userReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadUser : () => dispatch(loadUser()),
        setUserError : () => dispatch(setUserError()),
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