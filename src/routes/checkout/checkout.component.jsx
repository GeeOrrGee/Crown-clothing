import { useContext } from 'react';
import { CartContext } from '../../contexts/Cart.context';
import './checkout.styles.scss';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
const CheckoutPage = () => {
    const { cartItems, totalValue } = useContext(CartContext);

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>Product</div>
                <div className='header-block'>Description</div>
                <div className='header-block'>Quantity</div>
                <div className='header-block'>Price</div>
                <div className='header-block'>Remove</div>
            </div>
            {cartItems.map((item) => (
                <CheckoutItem key={item.id} item={item} />
            ))}
            <span className='total'>Total: ${totalValue}</span>
        </div>
    );
};

export default CheckoutPage;
