import {
    CategoryContainer,
    CategoryTitleContainer,
} from './Category.styles.jsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ProductCard from '../../components/ProductCard/ProductCard.component';
import { useSelector } from 'react-redux';
import {
    selectCategoriesMap,
    selectIsLoading,
} from '../../store/categories/categories.selector';
import {
    SpinnerContainer,
    SpinnerOverlay,
} from '../../components/spinner.styles.jsx';
export type CategoryParams = {
    category: string;
};
const Category = () => {
    const { category } = useParams<keyof CategoryParams>() as CategoryParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            {isLoading ? (
                <SpinnerOverlay>
                    <SpinnerContainer />
                </SpinnerOverlay>
            ) : (
                <>
                    <CategoryTitleContainer>
                        {category.toLocaleUpperCase()}
                    </CategoryTitleContainer>
                    <CategoryContainer>
                        {products &&
                            products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                    </CategoryContainer>
                </>
            )}
        </>
    );
};

export default Category;
