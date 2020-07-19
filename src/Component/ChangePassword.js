import React from 'react'
import styled from 'styled-components';
import { Typography, TextField, Button } from '@material-ui/core';

function ChangePassword() {
    return (
        <Container>
             <Header>
                <Typography variant='subtitle2' color='textPrimary' style={{ fontSize : '16px' }}>
                        Change Password
                </Typography>    
            </Header> 
            <Body>
                    <InputContainer>
                        <StyledTextField
                                label="Current password"
                                variant="outlined"
                                fullWidth
                                type="password"
                                size = 'small'
                            />
                    </InputContainer> 
                    <InputContainer>
                        <StyledTextField
                                label="New password"
                                variant="outlined"
                                fullWidth
                                type="password"
                                size = 'small'
                            />
                    </InputContainer> 
                    <InputContainer>
                        <StyledTextField
                                label="Confirm password"
                                variant="outlined"
                                fullWidth
                                type="password"
                                size = 'small'
                            />
                    </InputContainer> 
                    <div style={{ display : 'flex', justifyContent : 'flex-end', width : '90%' }}>
                          <Button 
                                variant="contained" 
                                color="primary" 
                                disableElevation
                                size='small'
                                style={{ textTransform : 'capitalize', marginTop : '20px' }} >
                                Change Password
                            </Button>
                     </div>   
            </Body>   
        </Container>
    )
}

export default ChangePassword;

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
   border-bottom : 1px solid rgba(0, 0, 0, 0.12);
`
const Body = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    padding : 20px 0px;
`
const InputContainer = styled.div`
    margin : 10px 0px;
    position : relative;
    width : 90%;
    .MuiFormHelperText-root {
        font-weight : 500;
    }
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
