import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './user/user-slice';
import categoriesReducer from './categories/categories-slice';
import cartReducer from './cart/cart-slice';


const rootReducer = combineReducers({
   user: userReducer,
   categories: categoriesReducer,
   cart: cartReducer
});

const persistConfig = {
   key: 'root',
   storage,
   blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: [logger]
});

export const persistor = persistStore(store);
