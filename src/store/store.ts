import {configureStore} from '@reduxjs/toolkit';
import userSlice from "./user.slice";
import {saveState} from "./storage";
import {JWT_PERSISTENT_STATE} from "./user.slice";

export const store = configureStore({
    reducer: {
        user: userSlice
    }
});
store.subscribe(() => {
    saveState(store.getState().user.jwt, JWT_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
