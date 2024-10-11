import { configureStore } from '@reduxjs/toolkit'
import tabsReducer from './features/tabs/tabsslice'
export const store = configureStore({
  reducer: {
    tabs : tabsReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch