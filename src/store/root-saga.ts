import { call, all } from 'typed-redux-saga/macro';
import { categoriesSaga } from './categories/categories.saga';
import { userSagas } from './user/user.sagas';
export function* rootSaga() {
    yield* all([call(categoriesSaga), call(userSagas)]);
}
