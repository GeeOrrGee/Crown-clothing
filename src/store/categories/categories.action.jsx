import { createAction } from '../../utils/createAction/createAction';
import { CATEGORIES_TYPES } from './categories.types';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
export const fetchCategoriesStart = () =>
    createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_START);
export const fetchCategoriesSuccess = (categories) =>
    createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS, categories);
export const fetchCategoriesFailed = (error) =>
    createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_FAIL, error);
