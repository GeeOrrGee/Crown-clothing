import { Route, Routes } from 'react-router-dom';

import CategoriesPreview from '../Categories-preview/Categories-preview.component';
import Category from '../Category/Category.component';
import './Shop.styles.scss';
export const Shop = () => {
    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=':category' element={<Category />} />
        </Routes>
    );
};

export default Shop;
