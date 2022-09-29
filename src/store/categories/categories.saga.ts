import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { all, put, takeLatest, call } from 'typed-redux-saga';
import {
    fetchCategoriesSuccess,
    fetchCategoriesFailed,
} from './categories.action';
import { CATEGORIES_TYPES } from './categories.types';

export function* fetchCategoriesAsync() {
    try {
        const categories = yield* call(getCategoriesAndDocuments);
        yield* put(fetchCategoriesSuccess(categories));
    } catch (error) {
        yield* put(fetchCategoriesFailed(error as Error));
    }
}

export function* onFetchCategories() {
    yield* takeLatest(
        CATEGORIES_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
    );
}

export function* categoriesSaga() {
    yield* all([call(onFetchCategories)]);
}
