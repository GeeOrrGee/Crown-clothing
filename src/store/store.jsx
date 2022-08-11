import { compose, createStore } from 'redux';
import { rootReducer } from './root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middleWares = [logger, sagaMiddleware];
// const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = configureStore({
    reducer: persistedReducer,
    // enhancers: composedEnhancers,
    middleware: middleWares,
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
