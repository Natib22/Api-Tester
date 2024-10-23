import { configureStore } from '@reduxjs/toolkit'
import tabsReducer from './features/tabs/tabsSlice'
import { apiSlice } from './features/apis/apisSlice'
export const store = configureStore({
  reducer: {
    tabs : tabsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,

    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }).concat(apiSlice.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch