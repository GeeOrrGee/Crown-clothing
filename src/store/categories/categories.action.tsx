import {
    Action,
    ActionWithPayload,
    createAction,
    withMatcher,
} from '../../utils/createAction/createAction';

import { CATEGORIES_TYPES, Category } from './categories.types';

export type FetchCategoriesStart =
    Action<CATEGORIES_TYPES.FETCH_CATEGORIES_START>;
export type FetchCategoriesSuccess = ActionWithPayload<
    CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS,
    Category[]
>;
export type FetchCategoriesFailed = ActionWithPayload<
    CATEGORIES_TYPES.FETCH_CATEGORIES_FAIL,
    Error
>;

export const fetchCategoriesStart = withMatcher(
    (): FetchCategoriesStart =>
        createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_START)
);
export const fetchCategoriesSuccess = withMatcher(
    (categories: Category[]): FetchCategoriesSuccess =>
        createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS, categories)
);
export const fetchCategoriesFailed = withMatcher(
    (error: Error): FetchCategoriesFailed =>
        createAction(CATEGORIES_TYPES.FETCH_CATEGORIES_FAIL, error)
);
