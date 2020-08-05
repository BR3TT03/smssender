import React from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion'
import { Typography, Button } from '@material-ui/core';
const fadeVariants = {
    start : { opacity : 0 },
    end : {
        opacity : 1,
        transition : {
            type : 'tween',
            duration : 0.2
        }
    }
}

function DeleteModal({ deleteGroupHandler, closeDeleteModal }) {
    return (
        <Container variants={fadeVariants} initial='start' animate='end'>
             <DeleteBox>
                    <StyledTypography variant='subtitle2' color='textPrimary'>
                          This record will permanently be removed from your system. Are you sure?  
                    </StyledTypography>
                    <div className='action'>
                        <Button variant='contained' 
                                color='secondary' 
                                disableElevation 
                                onClick={deleteGroupHandler}
                                size='small' 
                                style={{ textTransform : 'capitalize' }}>
                            Delete
                        </Button>
                        <Button variant='contained' 
                                disableElevation 
                                size='small' 
                                onClick={closeDeleteModal}
                                style={{ marginLeft : '7px', textTransform : 'capitalize' }}>
                            Cancel
                        </Button>
                    </div>
              </DeleteBox>   
        </Container>
    )
}

export default DeleteModal;

const Container = styled(motion.div)`
  width : 100vw;
  height : 100vh;
  position : absolute;
  top : 0px;
  left : 0px;
  background : rgba(0 ,0 ,0, 0.4);
  z-index : 1;
  display : flex;
  justify-content : center;
  align-items : center;
`;
const DeleteBox = styled.div`
    padding : 1rem;
    border-radius : 5px;
    background : #fff;
    .action {
        padding : 15px 0px 0px;
        display : flex;
        justify-content : flex-end;
    }
`;

const StyledTypography = styled(Typography)`
    &&& {
        font-size : 0.9rem;
        font-weight : 400;
    }
`