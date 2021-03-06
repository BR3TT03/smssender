import React from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components';
import bg from '../Assets/bg-icon.svg';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { motion } from 'framer-motion';
import Skeleton from '@material-ui/lab/Skeleton';
import GroupList from '../Component/GroupList';

const fadeVariant = {
    start : {
        opacity : 0
    },
    end : {
        opacity : 1,
        transition : {
            type : 'tween',
            duration : 0.5
        }
    }
}

const ManageGroups = ({ userLoader, user }) => {
    React.useEffect(() => {
        document.title = 'SMS Nepal - Manage Groups';
    },[])
    return (
        <Container variants={fadeVariant} initial='start' animate='end'>
                <Header>
                <div className= 'top'>
                        <div style={{ flex : '1' }}>
                            <Typography variant='h4' style={{ color : '#fff', fontWeight: '700' }}>
                                Manage Groups
                            </Typography> 
                            <Typography variant='subtitle2' style={{ color : '#fff', fontWeight : '400', marginTop : '5px' }}>
                                Create and manage group contacts for sending bulk SMS more easily.
                            </Typography>
                        </div>
                    { !userLoader ?  
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
                                            { user.smsLimit && user.smsLimit}
                                        </Typography> 
                                    </div>    
                            </div> 
                            :  
                            <Skeleton animation='wave' height={120} width={200}
                                    style={{ background : 'rgba(242, 113, 33, 0.7)'}}
                                />
                        }
                    </div>
                </Header>    
                { !userLoader ? 
                    <GridContainer container>
                            <StyledGrid item xs={12} sm={12} md={12} lg={12}>
                                   <GroupList /> 
                            </StyledGrid>  
                    </GridContainer>  
                    :
                    <LoaderContainer>
                            <CircularProgress />
                    </LoaderContainer>   } 
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        userLoader : state.userReducer.userLoader,
        user : state.userReducer.user,
    }
}

export default connect(mapStateToProps)(ManageGroups)

const Container = styled(motion.div)`
    height : calc(100% - 56px);
    overflow : auto;
    flex : 1;
    background : #DADDE1;
`
const Header = styled.div`
     height : 180px;
     ${({ theme }) => `background :  ${theme.palette.primary.main}`};
     padding : 10px 30px;
     box-sizing : border-box;
     background-image : url(${bg});
     background-size : 50%;
     @media( max-width : 768px ) {
         height : auto;
     }
     .top {
         position : relative;
         display : flex;
         @media( max-width : 768px ) {
             flex-direction : column;
         }
             .statCard  {
                  color : #fff ;
                  box-sizing : border-box;
                  padding : 5px 10px;
                  display : flex;
                  height : 70px;  
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
                  @media( max-width : 768px ) {
                        margin-top : 10px;
                    }
         }
     }
`



const StyledGrid = styled(Grid)`
    &&& {
        box-sizing : border-box;
        padding : 0px 5px;
    }
`
const GridContainer = styled(Grid)`
    box-sizing : border-box;
    padding : 0px 10px;
    margin-bottom : 10px;
    @media( min-width : 768px ) {
        margin-top : -70px;
    }
    @media( max-width : 768px ) {
        margin-top : 15px;
    }
`

const LoaderContainer = styled.div`
    position : absolute;
    left : 50%;
    transform : translate(-50%, -50%);
    height : 60px;
    width : 60px;
    border-radius : 60px;
    box-shadow: rgba(0, 0, 0, 0.05) 1px 0px 14px 0px;
    background : #fff;
    display : flex;
    justify-content : center;
    align-items : center;
`
