import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orderApi from '../../api/orders';
import { STATUS } from '../status'

interface IOrders {
    orders: any[],
    totalItem: number,
    status: string,
    page: number
}
export interface IOrdersState {
    ORDERS: IOrders
}
const initialState: IOrdersState = {
    ORDERS: {
        orders: [],
        totalItem: 0,
        page: 1,
        status: ""
    }
}

export const fetchAsyncOrders: any = createAsyncThunk(
    "ORDERS/fetchAsyncOrders",
    async (values: any) => {
        const res = await orderApi.getAllOrder(values);
        return {
            orders: res.data.context.data,
            page: values.page,
            totalItem: res.data.context.total
        }
    }
)
const ordersSlice = createSlice({
    name: "ORDERS",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAsyncOrders.pending]: (state) => {
            return { ...state, ORDERS: { ...state.ORDERS, status: STATUS.LOADING } }
        },
        [fetchAsyncOrders.fulfilled]: (state, { payload }) => {
            const { orders, page, totalItem } = payload
            return {
                ...state,
                ORDERS: {
                    orders: orders,
                    page: page,
                    totalItem: totalItem,
                    status: STATUS.SUCCESS
                }
            }
        },
        [fetchAsyncOrders.rejected]: (state) => {
            return { ...state, ORDERS: { ...state.ORDERS, status: STATUS.FAIL } }
        },
    }
})
export default ordersSlice.reducer