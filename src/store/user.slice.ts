import {createSlice} from "@reduxjs/toolkit";
import {Simulate} from "react-dom/test-utils";
import stalled = Simulate.stalled;
import {PayloadAction} from "@reduxjs/toolkit";

export interface UserState {
    jwt: string | null
}

const initialState: UserState = {
    jwt: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addJwt: (state,action:PayloadAction<string>) => {
            state.jwt = action.payload;
        },
        logOut: (state) => {
            state.jwt = null;
        }
    }
})
export default userSlice.reducer
export const userActions = userSlice.actions;