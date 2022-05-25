import {
    CategoryContainer,
    CategoryTitleContainer,
} from './Category.styles.jsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CategoriesContext } from '../../contexts/Categories.context';
import ProductCard from '../../components/ProductCard/ProductCard.component';
const Category = () => {
    const { category } = useParams();
    const { categories } = useContext(CategoriesContext);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts(categories[category]);
    }, [category, categories]);

    return (
        <>
            <CategoryTitleContainer>
                {category.toLocaleUpperCase()}
            </CategoryTitleContainer>
            <CategoryContainer>
                {products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </CategoryContainer>
        </>
    );
};

export default Category;
