import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'

import { getDefaultMiddleware } from '@reduxjs/toolkit';

import { persistStore, persistReducer } from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import {todoApi} from '../features/todo/todoSlice'
import { authApi } from '../features/auth/authApi';


const persistConfig = {
    key: 'root',
    storage,
}
  
  const persistedReducer = persistReducer(persistConfig, authReducer)


export const store = configureStore({
 
  reducer:{
    [todoApi.reducerPath]: todoApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth:persistedReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([todoApi.middleware, authApi.middleware]),
  devTools:true

    // reducer : persistedReducer,
    // middleware : (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false,
    //   })
})

export const persistor = persistStore(store)