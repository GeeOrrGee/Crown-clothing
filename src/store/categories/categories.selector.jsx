import { createSelector } from '@reduxjs/toolkit';

export const selectCategories = (state) =>
    state.categories.categories.reduce((acc, category) => {
        const { title, items } = category; //goes through data and destructuring it
        acc[title.toLowerCase()] = items; // applying data to the relevant title (title: [{data}])

        return acc;
    }, {});

export const selectIsLoading = (state) => state.categories.isLoading;
