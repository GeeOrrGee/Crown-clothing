import React from 'react';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/User.Context';

import { CartProvider } from './contexts/Cart.context';
const rootElement = document.getElementById('root');

// console.log(UserProvider);
render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    rootElement
);
