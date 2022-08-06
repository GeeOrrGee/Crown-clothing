import { useContext } from 'react';
import { useSelector } from 'react-redux';

import CategoryPreview from '../../components/category-preview/category-preview.component';

import { selectCategories } from '../../store/categories/categories.selector';

export const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategories);
    console.log(categoriesMap);
    return (
        <div className='shop-container'>
            {Object.keys(categoriesMap).map((title) => {
                const product = categoriesMap[title];
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
//categoriesContext ==> reduxified
