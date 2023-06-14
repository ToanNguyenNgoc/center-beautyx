import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from 'app/api/authApi';
import { IPUT_PROFILE } from 'app/api/interface';
import { USERROLE } from 'app/modules/auth';
import { STATUS } from '../status';
export const fetchAsyncUser: any = createAsyncThunk(
    "USER/fetchAsyncUser",
    async (ROLE) => {
        try {
            const res: any = await authApi.getUserProfile();
            const user = { ...res.data.context, ROLE }
            return user
        } catch (error) {
            // removeAuth();
        }
    }
)
export const updateAsyncUser: any = createAsyncThunk(
    "USER/updateAsyncUser",
    async (params: IPUT_PROFILE) => {
        const res = await authApi.putUserProfile(params);
        const payload = res.data.context
        return payload
    }
)
export interface IAccountState {
    USER: USERROLE,
    status: string
}

const initialState: IAccountState = {
    USER: {
        avatar: '',
        media: [],
        email: '',
        fullname: '',
        id: 0,
        telephone: '',
        token: '',
        token_expired_at: '',
        roles: '',
        ROLE: {
            id: 0, name: '', guard_name: '', summary: '', created_at: '', updated_at: ''
        }
    },
    status: ''
}
const accountSlice = createSlice({
    initialState,
    name: "USER",
    reducers: {
        putUser: (state, action) => {
            state.USER = action.payload
        },
        logoutUser: (state) => {
            state.USER = initialState.USER;
            state.status = STATUS.SUCCESS;
            // removeAuth();
        }
    },
    extraReducers: {
        [fetchAsyncUser.pending]: (state) => {
            return { ...state, status: STATUS.LOADING }
        },
        [fetchAsyncUser.fulfilled]: (state, { payload }) => {
            // console.log(payload)
            return { ...state, USER: payload, status: STATUS.SUCCESS }
        },
        [fetchAsyncUser.rejected]: (state) => {
            return { ...state, status: STATUS.FAIL }
        },
        [updateAsyncUser.pending]: (state) => {
            return { ...state, status: STATUS.LOADING }
        },
        [updateAsyncUser.fulfilled]: (state, { payload }) => {
            return { ...state, USER: payload, status: STATUS.SUCCESS }
        },
        [updateAsyncUser.rejected]: (state) => {
            return { ...state, status: STATUS.FAIL }
        }
    }
})
// export const getUserProfile = (state: any) => state
const { actions } = accountSlice;
export const { putUser, logoutUser } = actions;
export default accountSlice.reducer