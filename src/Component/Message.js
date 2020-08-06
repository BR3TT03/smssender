import React, { useState } from 'react'
import styled from 'styled-components';
import { Typography, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Checkbox, TextField, ClickAwayListener } from '@material-ui/core';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import SendIcon from '@material-ui/icons/Send';
import { connect } from 'react-redux';
import { sendMessage, setUserSuccess } from '../Store/Actions/userAction'
import Loader from './Loader'
import PublishIcon from '@material-ui/icons/Publish';
import readXlsxFile from 'read-excel-file'

function Message({ sendMessage, loader, success, setUserSuccess }) {

    const [number, setNumber] = useState({ value : '', error : false });
    const [numberList, setNumberList] = useState({});
    const [message, setMessage] = useState({ value : '', error : false });
    const fileRef = React.useRef(null);

    const [open, setOpen] = useState({ val : false, label : '' });
  
    const handleClickAway = () => {
      setOpen({ ...open, val : false });
    };

    const numberChangeHandler = e => {
        setNumber({ ...number, value : e.target.value });
        setOpen({ ...open, val : false });
    }

    const numberListHandler = () => {
        const check = Object.keys(numberList).findIndex(n => n === number.value );
        if(check === -1){
            let newList = { ...numberList };
            Object.assign(newList, { [number.value] : true });
            setNumberList({ ...newList });
            setNumber({ ...number, value : '' })
        }
        else {
            setOpen({ ...open, val : true, label : 'Number already exists.' });
        }
    }

    const checkBoxHandler = (key, e) => {
        setNumberList({
            ...numberList,
            [key] : e.target.checked
        })
    }

    const addNumberHandler = () => {
           
          if(number.value.length === 10){
             numberListHandler()
          }
          else {
              setOpen({ ...open, val : true, label : 'Enter a valid Number' });
          }
    }
    const pressHandler = e => {
        if(e.which === 13){
            addNumberHandler();
        }
    }

    const messageChangeHandler = e => {
        setMessage({ ...message, value : e.target.value, error : false })
    }

    const sendMessageHandler = () => {
        let messageError = false;
        if(message.value.length < 2){
            messageError = true
        }
        if(messageError) {
            setMessage({ ...message, error : messageError });
        }
        else {
           sendMessage(numberList, message.value)
        }
    }

    const fileChangeHandler = e => {
        let list = [];
        const regx = /^[9]\d{9}/;
        readXlsxFile(e.target.files[0]).then((rows) => {
               rows.map(number => number.map(num => list.push({ [num] : true })));
               list = list.filter(filterList => Object.keys(filterList)[0] !== 'null' && regx.test(Object.keys(filterList)[0]));
               let newList = {};
               list.map(ob => Object.assign(newList, ob));
               setNumberList({ ...numberList, ...newList })
        })
    }

    React.useEffect(() => {
        if(success.value){
            setNumber({ value : '', error : false });
            setNumberList({});
            setMessage({ value : '', error : false });
            setUserSuccess();
        }
    },[success, setUserSuccess])

    return (
        <Container>
            { loader ? <Loader /> :  null}
          <Header>
              <Typography variant='subtitle2' color='textPrimary' style={{ fontSize : '16px' }}>
                    Send Message
              </Typography>    
              <Button size='small' 
                      variant='contained' 
                      color='primary' 
                      endIcon={<PublishIcon fontSize='small'/>}
                      disableElevation
                      style={{ textTransform : 'capitalize' }}
                      onClick = {() => fileRef.current.click()}>
                    Import
              </Button>    
              <input type='file' ref={fileRef} style={{ display : 'none' }} onChange={fileChangeHandler} accept='.xlsx , .xls'/>
          </Header> 
          <SearchBox>
          <ClickAwayListener onClickAway={handleClickAway}>
                <div className='clickAway'>
                    <span className='box'>
                            <StyledPermContactCalendarIcon />
                            <input type='text' 
                                   placeholder = 'Enter receipt number....' 
                                   value={number.value} 
                                   onChange={numberChangeHandler}
                                   onKeyDown={pressHandler}
                                />
                            <Button color='primary' variant='contained' disableElevation onClick={addNumberHandler}>
                                Add
                            </Button>
                    </span>  
                    {open.val ? (
                                <div className='errorMsg'>
                                    {open.label}
                                </div>
                                ) : null}
                </div>
            </ClickAwayListener>   
          </SearchBox>
           <SMSList>
                {  Object.keys(numberList).length !== 0 ?
                    <TableContainer >
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Check</TableCell>
                                    <TableCell align="center">Number</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    Object.keys(numberList).reverse().map( key => 
                                            <TableRow key={key}>
                                                    <TableCell align="center">
                                                        <StyledCheckbox 
                                                                size='small' 
                                                                color='primary' 
                                                                checked={ numberList[key] }
                                                                onChange={ checkBoxHandler.bind(null, key) }/>
                                                    </TableCell>
                                                    <TableCell align="center">{key}</TableCell>
                                            </TableRow>
                                        )
                                }
                              
                            </TableBody>
                        </Table>
                </TableContainer>
                    :
                    <div style={{ display : 'flex', justifyContent : 'center', color : '#757575' }}>
                          <Typography variant='caption' >
                                Add a number to send message.    
                           </Typography>   
                     </div>   
                }       
            </SMSList>
            <MessageBox>
                    <StyledTextField
                         id="outlined-multiline-static"
                         label="Message"
                         multiline
                         variant="outlined"
                         rows={4}
                         fullWidth
                         value={message.value}
                         onChange={messageChangeHandler}
                         error={message.error}
                         helperText={ message.error ? "Message should be atleast two character long." : "" }
                    />
             </MessageBox> 
             <Action>
                    <Button size='small' 
                            variant='contained' 
                            color='primary' 
                            endIcon={<SendIcon />} 
                            disableElevation
                            onClick={sendMessageHandler}>
                        Send
                    </Button>
             </Action>          
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        loader : state.userReducer.messageLoader,
        success : state.userReducer.success,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sendMessage : (numberList, sms) => dispatch(sendMessage(numberList, sms)),
        setUserSuccess : () => dispatch(setUserSuccess()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);

const Container = styled.div`
    
    display : flex;
    flex-direction : column;
    margin-bottom : 20px;
    border-radius : 10px;
    background : #fff;
    box-shadow: rgba(53, 64, 82, 0.05) 1px 0px 14px 0px;
`

const Header = styled.div`
   height : 50px;
   padding : 0px 20px;
   display : flex;
   align-items : center;
   justify-content : space-between;
   border-bottom : 1px solid rgba(0, 0, 0, 0.12);
`
const SearchBox = styled.span`
   display : flex;
   justify-content : center;
   align-items : center;
   margin : 20px 10px 0px;
   box-sizing : border-box;
   position : relative;
   width : auto;
   .box {
        padding-left : 10px;
        border : 1px solid rgba(0, 0, 0, 0.2);
        display : flex;
        align-items : center;
        border-radius : 5px;
        button {
        border-radius : 0px;
        } 
        input {
            outline : none;
            width : 300px;
            font-size : 16px;
            border : 0px;
            &::placeholder {
                color : #aaa;
            }
            @media (max-width : 992px) {
                width : 100%;
            }
        }
       
   }
   .clickAway {
            .errorMsg {
                position : absolute;
                top : calc(100% + 5px);
                border : 1px solid #b00030;
                background : #b71c1c;
                font-size : 13px;
                padding: 10px;
                color: #fff;
                border-radius : 5px;
                &::before {
                    content : '';
                    position : absolute;
                    bottom : 100%;
                    border-top : 5px solid transparent;
                    border-bottom : 5px solid #b00030;
                    border-left : 5px solid transparent;
                    border-right : 5px solid transparent;
                }
            }
         }
 
`
const StyledPermContactCalendarIcon = styled(PermContactCalendarIcon)`
     &&& {
        font-size : 25px;
         margin-right : 10px;
         ${({ theme }) => `color : ${theme.palette.primary.main}`}
     }
`
const SMSList = styled.div`
    margin-top : 30px;
    padding : 0px 20px;
    max-height : 180px;
    overflow-y : auto;
`
const StyledCheckbox = styled(Checkbox)`
   &&& {
       padding : 5px;
   }
`

const MessageBox = styled.div`
   padding : 0px 20px;
   margin-top : 30px; 
   position : relative;
`
const Action = styled.div`
   display : flex;
   box-sizing : border-box;
   padding : 20px;
   justify-content : flex-end;
`
const StyledTextField = styled(TextField)`
    ${({ theme }) => `
        label {
            font-weight : 500;
        }
        .Mui-focused {
            font-weight : 400;
        }
        .MuiOutlinedInput-root {
            fieldset {
                border-color: rgba(0, 0, 0, 0.23);
            }
            &:hover fieldset {
                border-color: rgba(0, 0, 0, 0.23);
            }
            &.Mui-focused fieldset {
                border-color: ${theme.palette.primary.main};
            }
        }
        .MuiFormHelperText-root {
            position : absolute;
            top : 100%;
            margin-top : 0px;
            margin-left : 0px;
        }
        `}
`