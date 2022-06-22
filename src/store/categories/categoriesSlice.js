import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
   categoriesArray: []
};

export const categoriesSlice = createSlice({
   name: 'categories',
   initialState,

   reducers: {
      setCategories: (state, action) => {
         state.categoriesArray = action.payload
      }
   }
});

export const { setCategories } = categoriesSlice.actions;

export const selectCategoriesMap = createSelector(
   [(state) => state.categories.categoriesArray],
   (categoriesArray) =>
      categoriesArray.reduce((acc, category) => {
         const { title, items } = category;
         acc[title.toLowerCase()] = items;
         return acc;
      }, {})
);

export default categoriesSlice.reducer;
