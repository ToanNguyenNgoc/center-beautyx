import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUS } from "../status";

const initialState = {}
export const fetchAsyncService: any = createAsyncThunk(
    "SERVICE/fetchAsyncService",
    async () => {
        try {
            // const res = await commentsApi.postCommentOrg(values.values);
            
        } catch (error) {
            console.log(error);
        }
    }
);
const serviceSlice = createSlice({
    initialState,
    name: "SERVICE_CHART",
    reducers: {
       
    },
    extraReducers: {
        // post comments
        [fetchAsyncService.pending]: (state) => {
            return { ...state, status: STATUS.LOADING };
        },
        [fetchAsyncService.fulfilled]: (state, { payload }) => {
            console.log(payload);
            return {
                ...state,
                image_url: payload,
                status: STATUS.SUCCESS,
            };
        },
        [fetchAsyncService.rejected]: (state) => {
            return {
                ...state,
                status: STATUS.FAIL,
            };
        },
    },
});
const { actions } = serviceSlice;
// export const { clearPrevState } = actions;
export default serviceSlice.reducer;
