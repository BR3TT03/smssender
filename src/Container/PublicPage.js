import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import LandingPage from '../Component/LandingPage';
import ForgotPassword from '../Component/ForgotPassword';

function PublicPage() {
    return (
        <Switch>
             <Route path='/forgot-password' component={ForgotPassword} exact/>   
             <Route path='/' component={LandingPage} exact/>
             <Redirect to='/'/>   
        </Switch>
    )
}

export default PublicPage
