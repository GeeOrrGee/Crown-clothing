import './checkout-item.styles.scss';

import { useDispatch, useSelector } from 'react-redux';
import {
    addItemToCart,
    clearItemsFromCart,
    removeItemFromCart,
} from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
const CheckoutItem = ({ item }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const clearItemsFromCartHandler = () =>
        dispatch(clearItemsFromCart(cartItems, item));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, item));
    const removeItemHandler = () =>
        dispatch(removeItemFromCart(cartItems, item));
    const { id, imageUrl, name, price, quantity } = item;
    return (
        <div className='checkout-item-container' key={id}>
            <div className='image-container'>
                <img src={imageUrl} alt={name} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div onClick={removeItemHandler} className='arrow'>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div onClick={addItemHandler} className='arrow'>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <div onClick={clearItemsFromCartHandler} className='remove-button'>
                &#10005;
            </div>
        </div>
    );
};

export default CheckoutItem;
