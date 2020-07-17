import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Container/App';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './Store/Reducers/rootReducer';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
axios.defaults.baseURL = 'https://sms-nepal-backend.herokuapp.com'

const app = <Provider store={store}>
                <BrowserRouter>
                            <App/>
               </BrowserRouter>
            </Provider>

ReactDOM.render( app ,document.getElementById('root'));
