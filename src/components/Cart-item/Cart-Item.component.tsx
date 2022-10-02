import { FC } from 'react';
import { CartItemType } from '../../store/cart/cart.types';
import './Cart-item.styles.scss';

export type CartItemProps = {
    cartItem: CartItemType;
};

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
    const { name, quantity, imageUrl, price } = cartItem;
    return (
        <div className='cart-item-container'>
            <img src={imageUrl} alt={name} />
            <div className='item-details'>
                <span className='name'>{name}</span>
                <span className='price'>
                    {quantity} x ${price}
                </span>
            </div>
        </div>
    );
};

export default CartItem;
