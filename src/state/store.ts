import { configureStore } from "@reduxjs/toolkit";

import modalMessageReducer from "./modalMessage/modalMessageSlice";

// creating redux store
export const store = configureStore({
  reducer: {
    modalMessage: modalMessageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
