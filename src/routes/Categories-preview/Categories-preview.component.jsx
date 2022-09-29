import { useSelector } from 'react-redux';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import {
    SpinnerContainer,
    SpinnerOverlay,
} from '../../components/spinner.styles';

import {
    selectCategoriesMap,
    selectIsLoading,
} from '../../store/categories/categories.selector';

export const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
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
