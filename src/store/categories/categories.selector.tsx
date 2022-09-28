import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CategoriesState } from './categories.reducer';
import { CategoryMap } from './categories.types';

export const selectCategoriesState = (state: RootState): CategoriesState =>
    state.categories;

export const selectCategories = createSelector(
    [selectCategoriesState],
    (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories): CategoryMap =>
        categories.reduce((acc, category) => {
            const { title, items } = category; //goes through data and destructuring it
            acc[title.toLowerCase()] = items; // applying data to the relevant title (title: [{data}])

            return acc;
        }, {} as CategoryMap)
);

export const selectIsLoading = (state: RootState) => state.categories.isLoading;
