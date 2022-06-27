import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

const initialState = {
   categoriesArray: [],
   status: 'idle',
};

export const fetchCategoriesAsync = createAsyncThunk(
   'categories/fetchCategories',
   async () => {
      const categoriesArray = await getCategoriesAndDocuments();
      return categoriesArray;
   }
);

export const categoriesSlice = createSlice({
   name: 'categories',
   initialState,

   reducers: {
      setCategories: (state, action) => {
         state.categoriesArray = action.payload
      }
   },

   extraReducers: (builder) => {
      builder
         .addCase(fetchCategoriesAsync.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
            state.status = 'idle';
            state.categoriesArray = action.payload;
         });
   }
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
