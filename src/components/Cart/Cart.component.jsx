import './cart-icon.styles.scss';
import { ReactComponent as CartIcon } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../contexts/Cart.context';
export const Cart = () => {
    const { isCartOpen, setIsCartOpen, totalQuantity } =
        useContext(CartContext);

    const cartDropdownToggle = () => setIsCartOpen(!isCartOpen);
    return (
        <div className='cart-icon-container'>
            <CartIcon className='shopping-icon' onClick={cartDropdownToggle} />
            <span className='item-count'>{totalQuantity}</span>
        </div>
    );
};

export default Cart;
