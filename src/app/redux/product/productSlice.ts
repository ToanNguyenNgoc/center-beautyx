import {AsyncThunk, createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import productsApi from '../../api/productApi'
// import categoryApi from "../../api/categoryApi";
import {STATUS} from '../status'
import {IHIT_PRODUCT} from '../../interface/product_models'
import {
  IPRODUCT_GET_ALL,
  IPRODUCT_DETAIL_BY_ID,
  IPRODUCT_DETAIL_BY_ORG_ID,
} from '../../api/product_models'
interface IPRODUCTs {
  products: IHIT_PRODUCT[]
  page: number
  totalItem: number
  status_pr: string
}
// interface ICATE {
//     categories: [];
//     status: string;
// }
export interface IINITIALSTATE {
  // CATE: ICATE;
  PRODUCTS: IPRODUCTs
  org_id: any
  // choose_cate: any;
}
export const fetchAsyncProducts:any = createAsyncThunk(
  'TOP_PRODUCTS/fetchAsyncProducts',
  async (values: IPRODUCT_GET_ALL) => {
    const res = await productsApi.getProductsAll(values)
    // console.log(res)
    const payload:{
        products:IHIT_PRODUCT[]
        page: number
        totalItem: number
    } = {
      products: res?.data.data.hits,
      page: values.page||1,
      totalItem: res?.data.total,
    }
    return payload
  }
)
export const initialState: IINITIALSTATE = {
  org_id: null,
  // choose_cate: null,
  // CATE: {
  //     categories: [],
  //     status: "",
  // },
  PRODUCTS: {
    products: [],
    totalItem: 1,
    page: 1,
    status_pr: '',
  },
}
const ProductsSlice = createSlice({
  initialState,
  name: 'TOP_PRODUCT',
  reducers: {
    clearProducts: (state: any) => {
      return {
        ...state,
        PRODUCTS: {
          ...state.PRODUCTS,
          products: [],
          page: 1,
        },
      }
    },
    // onChooseCateServices: (state, { payload }) => {
    //     state.choose_cate = payload;
    // },
    // onSetEmptyChooseCatePr:(state)=>{
    //     state.choose_cate = null
    // }
  },
  extraReducers: {
    //get prducts org
    [fetchAsyncProducts.pending.toString()]: (state) => {
      return {
        ...state,
        PRODUCTS: {
          ...state.PRODUCTS,
          status_pr: STATUS.LOADING
        },
      }
    },
    [fetchAsyncProducts.fulfilled.toString()]: (state, {payload}) => {
      return {
        ...state,
        PRODUCTS: {
          products: [...state.PRODUCTS.products, ...payload.products],
          totalItem: payload.totalItem,
          page: payload.page,
          status_pr: STATUS.SUCCESS,
        },
      }
    },
    [fetchAsyncProducts.rejected.toString()]: (state) => {
      return {
        ...state,
        PRODUCTS: {...state.PRODUCTS, status_pr: STATUS.FAIL},
      }
    },
  },
})
const {actions} = ProductsSlice
export const {clearProducts} = actions
export default ProductsSlice.reducer
