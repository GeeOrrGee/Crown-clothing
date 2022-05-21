import Button from '../Button.component/Button.component';
import CartItem from '../Cart-item/Cart-Item.component';
import './cart-dropdown.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/Cart.context';

export const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => {
                    return <CartItem key={item.id} cartItem={item} />;
                })}
            </div>
            <Button>GO TO CHECK OUT</Button>
        </div>
    );
};

export default CartDropdown;
