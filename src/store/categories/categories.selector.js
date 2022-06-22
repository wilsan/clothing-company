import { createSelector } from "@reduxjs/toolkit";

export const selectCategoriesMap = createSelector(
   [(state) => state.categories.categoriesArray],
   (categoriesArray) =>
      categoriesArray.reduce((acc, category) => {
         const { title, items } = category;
         acc[title.toLowerCase()] = items;
         return acc;
      }, {})
);
