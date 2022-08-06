import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = configureStore({
    reducer: rootReducer,
    // enhancers: composedEnhancers,
    middleware: middleWares,
});
