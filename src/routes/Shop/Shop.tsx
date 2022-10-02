import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchCategoriesStart } from '../../store/categories/categories.action';

import CategoriesPreview from '../Categories-preview/Categories-preview.component';
import Category from '../Category/Category.component';
import './Shop.styles.scss';
export const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getCategoryMap = async () => {
            dispatch(fetchCategoriesStart());
        };
        getCategoryMap();
    }, [dispatch]);
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    );
};

export default Shop;
