import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import rootReducer from '../reducers'

export const FLASH_CARD_STORAGE_KEY = 'UdaciFitness:flashCard'

const persistConfig = {
  key: FLASH_CARD_STORAGE_KEY,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export {store, persistor}