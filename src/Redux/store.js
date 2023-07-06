import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import SourceUrlSlice from "./SourceUrlSlice"

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import loaderSlice from "./loaderSlice"
import notificationSlice from "./notificationSlice"

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({ user: userReducer, sourceUrl: SourceUrlSlice, loader: loaderSlice, notification: notificationSlice })

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)