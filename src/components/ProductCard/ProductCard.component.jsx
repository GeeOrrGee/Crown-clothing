import Button from '../Button.component/Button.component';
import './product-card.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/Cart.context';
import { buttonTypes } from '../Button.component/Button.component';
export const ProductCard = ({ product }) => {
    const { name, imageUrl, price } = product;

    const { addItemToCart } = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);

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
