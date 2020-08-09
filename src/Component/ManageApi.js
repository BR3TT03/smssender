import React, { useState, useRef } from 'react'
import styled from 'styled-components';
import bg from '../Assets/bg-icon.svg';
import { Grid, Typography, CircularProgress, Button, Tooltip } from '@material-ui/core';
import { motion } from 'framer-motion';
import Skeleton from '@material-ui/lab/Skeleton';
import { connect } from 'react-redux';
import { generateApi, getApiKey } from '../Store/Actions/userAction'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import CodeIcon from '@material-ui/icons/Code';
import ApiDocs from './ApiDocs';

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

function ManageApi({ userLoader, user, generateApi, apiKeyLoader, apiKey, getApiKey, getApiLoader }) {

    const [showApiDocs, setShowApiDocs] = useState(false)
    const [copied, setCopied] = useState(false)
    const inputRef = useRef(null);

    const generateApiKeyHandler = () => {
        generateApi()
    }

    const copyTextHandler = e => {
        if(navigator.clipboard){
            navigator.clipboard.writeText(inputRef.current.value);
            setCopied(true)
        }
        else {
            inputRef.current.select();
            document.execCommand("copy");
            setCopied(true)
        }
    }

    React.useEffect(() => {
       apiKey === 0 && getApiKey();
    }, [getApiKey, apiKey])

    return (
        <Container variants={fadeVariant} initial='start' animate='end'>
                <Header>
                    <div className= 'top'>
                        <div style={{ flex : '1' }}>
                            <Typography variant='h4' style={{ color : '#fff', fontWeight: '700' }}>
                                Manage Api
                            </Typography> 
                            <Typography variant='subtitle2' style={{ color : '#fff', fontWeight : '400', marginTop : '5px' }}>
                                Setup bulk messaging from your own system using our api.
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
                                                {user.smsLimit}
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
                            <StyledGrid item xs={12}>
                                   <ApiContainer>
                                        <ApiHeader>
                                            <Typography variant='subtitle2' color='textPrimary' style={{ fontSize : '16px' }}>
                                                    Your Api key
                                            </Typography>
                                            <GenerateApiBtn variant='contained' size='small'
                                                            onClick={generateApiKeyHandler}
                                                            disabled={apiKeyLoader}
                                                            disableElevation>
                                                { apiKeyLoader ?<CircularProgress style={{ color : '#fff' }} size={20}/> : 'Generate Api' }
                                            </GenerateApiBtn>
                                        </ApiHeader>
                                        <ApiBody>
                                            <ApiKey>
                                               {
                                                   getApiLoader ?
                                                   <>
                                                    <Skeleton width={50} height = {20}/>
                                                    <Skeleton width={250} height = {40}/>
                                                   </> :
                                                        apiKey === 0 ?
                                                        <Typography variant='subtitle2'
                                                                    color='textSecondary' 
                                                                    align = 'center'
                                                                    style={{ fontWeight : '400', marginLeft : '5px', fontSize : '1rem' }}>
                                                            You have not generated an API key.
                                                        </Typography> 
                                                        :
                                                        <>
                                                            <Typography variant='subtitle2'
                                                                        color='textSecondary' 
                                                                        style={{ fontWeight : '400', marginLeft : '5px', fontSize : '1rem' }}>
                                                                Api key 
                                                            </Typography> 
                                                            <div className='key'>
                                                                <input type='text' value={apiKey} readOnly ref={inputRef}/>
                                                                <Tooltip title={ copied ? 'Copied' : 'Copy' } 
                                                                         placement="top">
                                                                    <FileCopyOutlinedIcon 
                                                                        onClick={copyTextHandler}
                                                                        fontSize='small' 
                                                                        style={{ padding : '0px 7px', color:'rgba(0, 0, 0, 0.54)', cursor : 'pointer' }}/>
                                                                </Tooltip>
                                                            </div>
                                                     </>
                                                   } 
                                            </ApiKey>
                                            <Button variant='contained' size='small' 
                                                    disableElevation
                                                    color='primary'
                                                    onClick={() => setShowApiDocs(!showApiDocs)}
                                                    endIcon={<CodeIcon fontSize='small'/>}
                                                    style={{ margin : '1rem', textTransform : 'capitalize' }}>
                                                 View Api docs
                                            </Button>
                                            {showApiDocs ? <ApiDocs /> : null}
                                        </ApiBody>
                                   </ApiContainer>
                            </StyledGrid>  
                        </GridContainer>  
                        :
                        <LoaderContainer>
                                <CircularProgress />
                        </LoaderContainer>   
                    } 
                </Container>
    )
}

const mapStateToProps = state => {
    return {
        userLoader : state.userReducer.userLoader,
        apiKeyLoader : state.userReducer.apiKeyLoader,
        apiKey : state.userReducer.apiKey,
        user : state.userReducer.user,
        getApiLoader : state.userReducer.getApiLoader
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        generateApi : () => dispatch(generateApi()),
        getApiKey : () => dispatch(getApiKey())
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(ManageApi);

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
const ApiContainer = styled.div`
    margin-bottom : 20px;
    border-radius : 10px;
    width : 100%;
    background : #fff;
    box-sizing : border-box;
    box-shadow: rgba(53, 64, 82, 0.05) 1px 0px 14px 0px;
`
const ApiHeader = styled.div`
   height : 60px;
   padding : 0px 20px;
   display : flex;
    box-sizing : border-box;
   align-items : center;
   justify-content : space-between;
   border-bottom : 1px solid rgba(0, 0, 0, 0.12);
`
const ApiBody = styled.div`
   box-sizing : border-box;
   padding : 0.7rem;
`;
const GenerateApiBtn = styled(Button)`
   &&& {
       ${({ theme }) => `
       background : ${theme.palette.success.main};
       color : #fff;
   `}
   }
`
const ApiKey = styled.div`
  display : flex;
  flex-direction : column;
  box-sizing : border-box;
  padding : 0px 1rem;
  .key {
      display : flex;
      width : 100%;
      margin-top : 7px;
      background : #eee;
      align-items : center;
      input {
          outline : none;
          flex : 1;
          border : 0;
          box-sizing : border-box;
          padding : 0.6rem;
          font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',monospace;
          font-size : 1rem;
          background : #eee;
      }
  }
`;