import './category-preview.styles.scss';
import ProductCard from '../ProductCard/ProductCard.component';
import { Link } from 'react-router-dom';

const CategoryPreview = ({ title, product }) => {
    return (
        <div className='category-preview-container'>
            <h2>
                <Link to={title} className='title'>
                    {title.toUpperCase()}
                </Link>
            </h2>
            <div className='preview'>
                {product
                    .filter((_, index) => index < 4)
                    .map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
            </div>
        </div>
    );
};

export default CategoryPreview;
