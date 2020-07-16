import React from 'react'
import styled from 'styled-components';
import { Avatar, Typography, Divider } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';
import { NavLink } from 'react-router-dom';
import SmsIcon from '@material-ui/icons/Sms';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Navigation() {
    return (
        <Container>
              <Header>
                    <SmsIcon/>
                    <LogoTypo>
                         SMS Nepal
                    </LogoTypo>
              </Header>
              <Divider />
              <StyledAvatar>
                    A
               </StyledAvatar> 
               <Name>
                   <Typography variant='subtitle2'>
                         Abhinay Shrestha
                   </Typography>    
                </Name> 
                <StyledList component="nav" aria-labelledby="nested-list-subheader">
                        <StyledNavLink to='/dashboard' activeClassName='activeNav' exact>
                                <ListItem button>
                                        <ListItemIcon>
                                            <BarChartOutlinedIcon fontSize='small'/>
                                        </ListItemIcon>
                                        <ListItemText primary="Dashboard" />
                                </ListItem>
                        </StyledNavLink>
                        <StyledNavLink to='/setting' activeClassName='activeNav' exact>
                                <ListItem button>
                                        <ListItemIcon>
                                            <SettingsIcon fontSize='small'/>
                                        </ListItemIcon>
                                        <ListItemText primary="Setting" />
                                </ListItem>
                        </StyledNavLink>
                        <StyledNavLink to='/subscription' activeClassName='subs' exact>
                                <ListItem button>
                                        <ListItemIcon>
                                            <i className="flaticon-crown"></i>
                                        </ListItemIcon>
                                        <ListItemText primary="Subscription" style={{ color : '#F27121' }}/>
                                </ListItem>
                        </StyledNavLink>
                        <ListItem button>
                                        <ListItemIcon>
                                            <ExitToAppIcon fontSize='small' style={{ color : '#bfbfbf' }}/>
                                        </ListItemIcon>
                                        <ListItemText primary="Log out" style={{ color : '#bfbfbf' }}/>
                        </ListItem>
                </StyledList>      
                <Footer>
                    <Typography variant='caption' align='center'>
                         SMS Nepal &copy; 2020
                    </Typography>
              </Footer>
        </Container>    
    )
}

export default Navigation;

const Container = styled.div`
    height : 100%;
    flex-basis : 260px;
    display : flex;
    flex-direction : column;
    align-items : center;
    border-right : 1px solid rgba(0, 0, 0, 0.12);
    box-sizing: border-box;
    background : #031525;
`
const Header = styled.div`
    height : 56px;
    box-sizing : border-box;
    padding : 0px 10px;
    display : flex;
    align-items : center;
    color : #fff;
    border-bottom : 1px solid  rgba(255, 255, 255, 0.1);
    width : 100%;
`
const StyledAvatar = styled(Avatar)`
    && {
        height : 60px;
        width : 60px;
        margin-top : 20px;
        ${({ theme }) => `background : ${theme.palette.success.main}`};
        font-size : 30px;
    }
`
const Name = styled.div`
    margin-top : 7px;
    text-align : center;
    font-size : 15px;
    color : #fff;
`
const StyledList = styled(List)`
   &&& {
       flex : 1;
       box-sizing : border-box;
       margin-top : 20px;
       width : 100%;
       color: #546e7a;
       padding-left : 10px;
       padding-right : 10px;
       .MuiListItem-root {
           padding-top : 5px;
           padding-bottom : 5px;
       }
       .MuiListItemIcon-root {
           min-width : 0px;
           margin-right: 8px;
       }
       .MuiButtonBase-root {
           border-radius : 3px;
       }
       .MuiTypography-root{
           font-size: 0.915rem;
           font-weight : 500;
       }
   }
  
`
const StyledNavLink = styled(NavLink)`
    ${({ theme }) => `
      &&& {
            color: #bfbfbf;
            text-decoration: none;
            .MuiSvgIcon-root{
                color : #bfbfbf;
            }
            &.activeNav {
                  color : #bfbfbf;
                }
            }
            &.activeNav .MuiButtonBase-root {
                background : rgba(255, 255, 255, 0.1);
            }
            &.activeNav .MuiSvgIcon-root{
                color : #bfbfbf;
            }
            &.subs .MuiButtonBase-root{
                background : rgba(242, 113, 33, 0.2);
            }
    `}
`
const LogoTypo = styled(Typography)`
   &&& {
     font-family: 'Kanit', sans-serif;
     flex : 1;
     font-size : 20px;
     margin-left : 6px;
   }
`
const Footer = styled.div`
    height : 56px;
    box-sizing : border-box;
    padding : 0px 10px;
    display : flex;
    align-items : center;
    color : #fff;
    border-top : 1px solid  rgba(255, 255, 255, 0.1);
    width : 100%;
    justify-content : center;
`