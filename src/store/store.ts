import { rootReducer } from './root-reducer';
import { configureStore, Middleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';

export type RootState = ReturnType<typeof rootReducer>;

export type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[];
};
const persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const middleWares = [false, logger, sagaMiddleware].filter(
    (middleware): middleware is Middleware => Boolean(middleware)
);
// const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = configureStore({
    reducer: persistedReducer,
    // enhancers: composedEnhancers,
    middleware: middleWares,
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
