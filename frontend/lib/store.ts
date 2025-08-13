// store.ts
import { configureStore } from "@reduxjs/toolkit";
import listingReducer from "./slice/listingSlice";
import userReducer from "./slice/userSlice";
import messageReducer from "./slice/messageSlice";


export const makeStore = () => {
  return configureStore({
     reducer: {
    listings: listingReducer,
    users: userReducer,
    messages: messageReducer, // Ensure you import and add the messageReducer
  },
  })
}


// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']