import './checkout-item.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/Cart.context';
const CheckoutItem = ({ item }) => {
    const { clearItemsFromCart, addItemToCart, removeItemFromCart } =
        useContext(CartContext);
    const clearItemsFromCartHandler = () => clearItemsFromCart(item);
    const addItemHandler = () => addItemToCart(item);
    const removeItemHandler = () => removeItemFromCart(item);
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
