import { CATEGORIES_TYPES } from './categories.types';

const INITIAL_STATE = {
    categories: [],
    isLoading: false,
    error: null,
};

export const categoriesReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    console.log(state);
    switch (type) {
        case CATEGORIES_TYPES.FETCH_CATEGORIES_START:
            return { ...state, isLoading: true };
        case CATEGORIES_TYPES.FETCH_CATEGORIES_SUCCESS:
            return { ...state, isLoading: false, categories: payload };
        case CATEGORIES_TYPES.FETCH_CATEGORIES_FAIL:
            return { ...state, isLoading: false, error: payload };

        default:
            return state;
    }
};
