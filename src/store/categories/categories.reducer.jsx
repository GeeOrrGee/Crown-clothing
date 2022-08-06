import { CATEGORIES_TYPES } from './categories.types';

export const categoriesReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case CATEGORIES_TYPES.SET_CATEGORIES_MAP:
            return { ...state, ...payload };
        default:
            return state;
    }
};
