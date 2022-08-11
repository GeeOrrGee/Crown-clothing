import { useContext } from 'react';
import { useSelector } from 'react-redux';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import {
    SpinnerContainer,
    SpinnerOverlay,
} from '../../components/spinner.styles';

import {
    selectCategories,
    selectCategoryMap,
    selectIsLoading,
} from '../../store/categories/categories.selector';

export const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategories);
    const isLoading = useSelector(selectIsLoading);

    return (
        <>
            {isLoading ? (
                <SpinnerOverlay>
                    <SpinnerContainer />
                </SpinnerOverlay>
            ) : (
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
            )}
        </>
    );
};

export default CategoriesPreview;
//categoriesContext ==> reduxified
