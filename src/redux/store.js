import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import ticketReducer from './ticketSlice'
import { thunk } from 'redux-thunk'

export const store = configureStore({
    reducer: {
        user:userReducer,
        ticket:ticketReducer
    },
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false})
  })
  