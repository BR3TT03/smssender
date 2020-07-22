import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import PublicPage from './PublicPage';
import Dashboard from './Dashboard';
import '../font/flaticon.css'
import { connect } from 'react-redux';
import { checkAuth } from '../Store/Actions/authAction';

function App({ isAuth, checkAuth }) {

  const theme = createMuiTheme({
    palette : {
        primary : {
            main : '#311b92'
        },
        secondary : {
            main : '#f44336'
        },
        text : {
            primary : '#000',
            hint : '#9e9e9e'
        }
    }
  })

  React.useEffect(() => {
      checkAuth();
  },[checkAuth])

  return (
          <MuiThemeProvider theme={theme} >  
              <ThemeProvider theme={theme} >
                      { isAuth ? <Dashboard /> : <PublicPage />}
              </ThemeProvider> 
          </MuiThemeProvider> 
     );
}

const mapStateToProps = state => {
    return {
        isAuth : state.authReducer.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkAuth : () => dispatch(checkAuth())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
