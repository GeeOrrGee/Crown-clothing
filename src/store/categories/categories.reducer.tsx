import { AnyAction } from 'redux';
import {
    fetchCategoriesFailed,
    fetchCategoriesStart,
    fetchCategoriesSuccess,
} from './categories.action';
import { Category } from './categories.types';

export type CategoriesState = {
    readonly categories: Category[];
    readonly isLoading: boolean;
    readonly error: Error | null;
};

const INITIAL_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null,
};

export const categoriesReducer = (
    state = INITIAL_STATE,
    action = {} as AnyAction
): CategoriesState => {
    if (fetchCategoriesStart.match(action)) {
        return { ...state, isLoading: true };
    }

    if (fetchCategoriesSuccess.match(action)) {
        return { ...state, isLoading: false, categories: action.payload };
    }

    if (fetchCategoriesFailed.match(action)) {
        return { ...state, isLoading: false, error: action.payload };
    }

    return state;
    // switch (action.type) {
    //     case CATEGORIES_TYPES.FETCH_CATEGORIES_START:
    //         return { ...state, isLoading: true };
    //     case CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS:
    //         return { ...state, isLoading: false, categories: action.payload };
    //     case CATEGORIES_TYPES.FETCH_CATEGORIES_FAIL:
    //         return { ...state, isLoading: false, error: action.payload };

    //     default:
    //         return state;
    // }
};
