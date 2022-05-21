import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/User.Context';
import { ProductsProvider } from './contexts/Products.context';
import { CartProvider } from './contexts/Cart.context';
const rootElement = document.getElementById('root');

// console.log(UserProvider);
render(
    <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <ProductsProvider>
                    <CartProvider>
                        <App />
                    </CartProvider>
                </ProductsProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>,
    rootElement
);
