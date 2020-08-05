import React from 'react'
import styled from 'styled-components';
import  { Switch, Route } from 'react-router-dom'
import CreateGroupForm from './CreateGroupForm';
import EditGroup from './EditGroup';
import AddMember from './AddMember';
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

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

function CreateGroupRoute({ closeModalHandler }) {

    const location = useLocation();

    return (
        <Container variants={fadeVariants} initial='start' animate='end'>
             <FormContainer>
                 <AnimatePresence exitBeforeEnter initial={false}>
                        <Switch location={location} key={location.key}>
                            <Route path='/manage-groups/create-group'>
                                <CreateGroupForm closeModalHandler={closeModalHandler}/>
                            </Route>  
                            <Route path='/manage-groups/edit-group'>
                                <EditGroup closeModalHandler={closeModalHandler}/>
                            </Route> 
                            <Route path='/manage-groups/add-member'>
                                <AddMember closeModalHandler={closeModalHandler}/>
                            </Route> 
                        </Switch>
                 </AnimatePresence>
             </FormContainer>    
        </Container>
    )
}

export default CreateGroupRoute

const Container = styled(motion.div)`
  width : 100vw;
  height : 100vh;
  position : absolute;
  top : 0px;
  left : 0px;
  background : rgba(0 ,0 ,0, 0.3);
  z-index : 1;
  display : flex;
  justify-content : center;
`;

const FormContainer = styled.div`
   height : 100%;
   box-sizing : border-box;
   padding : 1rem;
   width : 500px;
   background : #fff;
   display : flex;
   overflow-x : hidden;
`;
