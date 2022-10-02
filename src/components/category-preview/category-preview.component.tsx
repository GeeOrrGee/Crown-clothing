import './category-preview.styles.scss';
import ProductCard from '../ProductCard/ProductCard.component';
import { Link } from 'react-router-dom';
import { CategoryItem } from '../../store/categories/categories.types';
import { FC } from 'react';

export type CategoryPreviewProps = {
    title: string;
    products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
    return (
        <div className='category-preview-container'>
            <h2>
                <Link to={title} className='title'>
                    {title.toUpperCase()}
                </Link>
            </h2>
            <div className='preview'>
                {products
                    .filter((_, index) => index < 4)
                    .map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
            </div>
        </div>
    );
};

export default CategoryPreview;
