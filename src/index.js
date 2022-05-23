import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/User.Context';
import { CategoriesProvider } from './contexts/Categories.context';
import { CartProvider } from './contexts/Cart.context';
const rootElement = document.getElementById('root');

// console.log(UserProvider);
render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <CategoriesProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </CategoriesProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>,
    rootElement
);
