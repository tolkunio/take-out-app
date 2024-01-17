import {createSlice} from "@reduxjs/toolkit";
import {loadState} from "./storage";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {LoginResponse} from "../interfaces/auth.interface";
import {PREFIX} from "../helpers/API";
import axios from "axios";
import {PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {Profile} from "../interfaces/user.interface";
import {RootState} from "./store";
import {Register} from "../interfaces/user.interface";

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserState {
    jwt: string | null,
    loginErrorMsg?: string,
    profile?: Profile,
    register?:Register,
    registerErrorMsg?: string,
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
    });
export const register = createAsyncThunk('user/register',
    async (params: { email: string,name:string, password: string }) => {
        try {
            const {data} = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {
                email: params.email,
                name:params.name,
                password: params.password
            });
            return data;
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.response?.data.message);
            }
        }
    });

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>('user/getProfile',
    async (_, thunkAPI) => {
        const {jwt} = thunkAPI.getState().user;
        const {data} = await axios.get<Profile>(`${PREFIX}/user/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        return data;

    });


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state) => {
            state.jwt = null;
        },
        clearLoginError: (state) => {
            state.loginErrorsMg = undefined;
        },
        clearRegisterError: (state) => {
            state.registerErrorMsg = undefined;
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
        builder.addCase(getProfile.fulfilled,(state:UserState, action)=>{
            state.profile=action.payload;
        });
        builder.addCase(register.fulfilled,(state:UserState, action:PayloadAction<LoginResponse>)=>{
            if (!action.payload) {
                return;
            }
            state.jwt = action.payload.access_token;
        })
        builder.addCase(register.rejected, (state: UserState, action) => {
            state.registerErrorMsg = action.error.message;
        });

    }

})
export default userSlice.reducer
export const userActions = userSlice.actions;