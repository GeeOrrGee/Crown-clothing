import Button from '../Button.component/Button.component';
import CartItem from '../Cart-item/Cart-Item.component';
import {
    CartDropdownContainer,
    CartItems,
    EmptyMessage,
} from './cart-dropdown.styles.jsx';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';

export const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);

    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate('/checkout');
    };
    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => {
                        return <CartItem key={item.id} cartItem={item} />;
                    })
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>

            <Button onClick={goToCheckoutHandler}>GO TO CHECK OUT</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
