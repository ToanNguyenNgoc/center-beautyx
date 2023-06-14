import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {AuthModel} from '../interface/account_models';
import authApi from '../api/authApi';
import {ILOGIN} from '../api/interface';

import { STATUS } from './status'

export const loginAsync: any = createAsyncThunk(
    "LOGIN/loginAsync",
    async (params: ILOGIN) => {
        try {
            const res = await authApi.login(params);
            const payload = res.data.context;
            return payload;
        } catch (error) {
            console.log(error)
        }
    }
)
export interface IState {
    response: AuthModel|null,
    status: string
}
const initialState:IState = {
    response: null,
    status: ''
}
const loginSlice = createSlice({
    name: "LOGIN",
    initialState,
    reducers: {},
    extraReducers: {
        [loginAsync.pending]: (state) => {
            return { ...state, status: STATUS.LOADING }
        },
        [loginAsync.fulfilled]: (state, { payload }) => {
            return {
                response: payload,
                status: STATUS.SUCCESS
            }
        },
        [loginAsync.rejected]: (state) => {
            return { ...state, status: STATUS.FAIL }
        }
    }
})
export default loginSlice.reducer;