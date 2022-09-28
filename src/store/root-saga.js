import { call, all } from 'redux-saga/effects';
import { categoriesSaga } from './categories/categories.saga';
import { userSagas } from './user/user.sagas';
export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSagas)]);
}