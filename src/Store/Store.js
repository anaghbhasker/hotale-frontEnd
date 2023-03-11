import { configureStore } from '@reduxjs/toolkit';
import { persistStore,persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { userLoginSlice } from './Slice/Userauth.js'
import { ownerLoginSlice } from './Slice/Ownerauth.js'

const persistConfig={ key:"root",storage,version: 1 };


const userLoginPersistedReducer= persistReducer(
    persistConfig,
    userLoginSlice.reducer
);

const ownerLoginPersistedReducer=persistReducer(
    persistConfig,
    ownerLoginSlice.reducer
)

export const store = configureStore({
    reducer:{
        userLogin:userLoginPersistedReducer,
        ownerLogin:ownerLoginPersistedReducer
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        }
    })
})

export const persistor=persistStore(store)