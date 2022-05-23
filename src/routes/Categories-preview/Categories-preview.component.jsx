import { useContext } from 'react';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import { CategoriesContext } from '../../contexts/Categories.context';

export const CategoriesPreview = () => {
    const { categories } = useContext(CategoriesContext);
    return (
        <div className='shop-container'>
            {Object.keys(categories).map((title) => {
                const product = categories[title];
                return (
                    <CategoryPreview
                        key={title}
                        product={product}
                        title={title}
                    />
                );
            })}
        </div>
    );
};

export default CategoriesPreview;
