import './Category.styles.scss';
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
            <h2 className='category-title-container'>
                {category.toLocaleUpperCase()}
            </h2>
            <div className='category-container'>
                {products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </>
    );
};

export default Category;
