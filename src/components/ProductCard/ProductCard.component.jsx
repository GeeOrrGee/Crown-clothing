import Button from '../Button.component/Button.component';
import './product-card.styles.scss';

import { buttonTypes } from '../Button.component/Button.component';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
export const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product;

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const addProductToCart = () => {
        console.log(cartItems);
        dispatch(addItemToCart(cartItems, product));
    };

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button
                btnType={`${buttonTypes.inverted}`}
                onClick={addProductToCart}
            >
                Add to cart
            </Button>
        </div>
    );
};

export default ProductCard;
