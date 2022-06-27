import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
   persistStore,
   persistReducer,
   FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { rootReducer } from './root-reducer';

const persistConfig = {
   key: 'root',
   storage,
   whitelist: ['cart']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
         ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         ignoredPaths: ['user.currentUser']
      }
   }).concat(middleWares)
});

export const persistor = persistStore(store);
