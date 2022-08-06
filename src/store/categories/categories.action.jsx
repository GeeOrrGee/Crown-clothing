import { createAction } from '../../utils/createAction/createAction';
import { CATEGORIES_TYPES } from './categories.types';

export const setCategoriesMap = (categoriesMap) =>
    createAction(CATEGORIES_TYPES.SET_CATEGORIES_MAP, categoriesMap);
