import { compose, createStore } from 'redux';
import { rootReducer } from './root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [logger, thunk];
// const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = configureStore({
    reducer: persistedReducer,
    // enhancers: composedEnhancers,
    middleware: middleWares,
});

export const persistor = persistStore(store);
