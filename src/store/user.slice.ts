import {createSlice} from "@reduxjs/toolkit";
import {loadState} from "./storage";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {LoginResponse} from "../interfaces/auth.interface";
import {PREFIX} from "../helpers/API";
import axios from "axios";
import {PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserState {
    jwt: string | null,
    loginErrorMsg?: string
}

export interface UserPersistentState {
    jwt?: string
}

const initialState: UserState = {
    jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};
export const login = createAsyncThunk('user/login',
    async (params: { email: string, password: string }) => {
        try {
            const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
                email: params.email,
                password: params.password
            });
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message);
            }
        }
    })

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state) => {
            state.jwt = null;
        },
        clearLoginError: (state) => {
            state.loginErrorsMg = undefined;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state: UserState, action: PayloadAction<LoginResponse>) => {
            if (!action.payload) {
                return;
            }
            state.jwt = action.payload.access_token;
        });
        builder.addCase(login.rejected, (state: UserState, action) => {
            state.loginErrorMsg = action.error.message;
        });
    }

})
export default userSlice.reducer
export const userActions = userSlice.actions;