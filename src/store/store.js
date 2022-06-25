import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userReducer from './user/user-slice';
import categoriesReducer from './categories/categories-slice';
import cartReducer from './cart/cart-slice';

export const store = configureStore({
   reducer: {
      user: userReducer,
      categories: categoriesReducer,
      cart: cartReducer
   },
   middleware: [logger]
});
