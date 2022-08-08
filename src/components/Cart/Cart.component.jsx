import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action.jsx';
import {
    selectCartCount,
    selectIsCartsOpen,
} from '../../store/cart/cart.selector.jsx';
import {
    CartIconContainer,
    ShoppingIcon,
    CartItemCount,
} from './cart-icon.styles.jsx';

export const Cart = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartsOpen);
    const totalQuantity = useSelector(selectCartCount);

    const cartDropdownToggle = () => dispatch(setIsCartOpen(!isCartOpen));
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
