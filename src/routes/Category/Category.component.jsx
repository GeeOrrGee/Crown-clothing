import {
    CategoryContainer,
    CategoryTitleContainer,
} from './Category.styles.jsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';

import ProductCard from '../../components/ProductCard/ProductCard.component';
import { useSelector } from 'react-redux';
import {
    selectCategories,
    selectIsLoading,
} from '../../store/categories/categories.selector.jsx';
import {
    SpinnerContainer,
    SpinnerOverlay,
} from '../../components/spinner.styles.jsx';
const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategories);
    const isLoading = useSelector(selectIsLoading);
    const [products, setProducts] = useState([]);
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
