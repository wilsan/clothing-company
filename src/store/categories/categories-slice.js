import { createSlice } from "@reduxjs/toolkit";

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

export default categoriesSlice.reducer;
