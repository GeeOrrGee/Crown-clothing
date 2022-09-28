import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { all, put, takeLatest, call } from 'redux-saga/effects';
import {
    fetchCategoriesSuccess,
    fetchCategoriesFailed,
} from './categories.action';
import { CATEGORIES_TYPES } from './categories.types';

export function* fetchCategoriesAsync() {
    try {
        const categories = yield call(getCategoriesAndDocuments, 'categories');
        yield put(fetchCategoriesSuccess(categories));
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}

export function* onFetchCategories() {
    yield takeLatest(
        CATEGORIES_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
    );
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)]);
}