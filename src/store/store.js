import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from './user/userSlice';
import categoriesReducer from './categories/categoriesSlice';

export const store = configureStore({
   reducer: {
      user: userReducer,
      categories: categoriesReducer
   },
   middleware: [logger]
});
