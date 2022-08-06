import {
    CartIconContainer,
    ShoppingIcon,
    CartItemCount,
} from './cart-icon.styles.jsx';

import { useContext } from 'react';
import { CartContext } from '../../contexts/Cart.context';
export const Cart = () => {
    const { isCartOpen, setIsCartOpen, totalQuantity } =
        useContext(CartContext);
    console.log(totalQuantity);
    const cartDropdownToggle = () => setIsCartOpen(!isCartOpen);
    return (
        <CartIconContainer>
            <ShoppingIcon
                className='shopping-icon'
                onClick={cartDropdownToggle}
            />
            <CartItemCount className='item-count'>
                {totalQuantity}
            </CartItemCount>
        </CartIconContainer>
    );
};

export default Cart;
