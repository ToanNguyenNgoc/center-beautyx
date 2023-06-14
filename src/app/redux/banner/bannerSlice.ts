import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { IBanner } from '../../interface/banner'
import bannerApi from '../../api/bannerApi'
import { STATUS } from '../status';

const initBanner = {
  id: 0,
  name: "",
  type: null,
  imageURL: "",
  htmlTemplate: "",
  url: "",
  target: null,
  width: '',
  height: '',
  view_count: '',
  expires_at: "",
  origin_type: null,
  origin_id: null,
  deleted_at: null,
  created_at: '',
  updated_at: '',
  platform: '',
  priority: 0
}

export const fetchAsyncBanner: any = createAsyncThunk('BANNER/fetchAsyncBanner', async () => {
  try {
    const res = await bannerApi.getAll()
    const payload = res.data.context
    return payload
  } catch (error) {
    console.log(error)
  }
})

export const postAsyncBanner: any = createAsyncThunk(
  "BANNER/postAsyncBanner",
  async (values: any) => {
    console.log(values)
    const res = await bannerApi.postBanner(values);
  }
)
export const fetchAsyncBannerDetail: any = createAsyncThunk(
  "BANNER/fetchAsyncBannerDetail",
  async (id: number) => {
    const res = await bannerApi.getDetailById(id);
    return {
      ...initBanner,
      ...res.data.context
    }
  }
)


interface res {
  page: number,
  data: IBanner[]
  totalItem: number
}
interface IBannerDetail {
  banner: IBanner,
  status: string
}
export interface IBannerState {
  banner: res
  status: string,
  bannerDetail: IBannerDetail
}
const initialState: IBannerState = {
  banner: {
    page: 0,
    data: [initBanner],
    totalItem: 0
  },
  status: '',
  bannerDetail: {
    banner: initBanner,
    status: ""
  }
}
const bannerSlice = createSlice({
  name: 'BANNER',
  initialState,
  reducers: {
    onSortTableBanner:(state, action)=>{
      state.banner.data = action.payload
    },
    onChangeValueBanner: (state, action) => {
      state.bannerDetail.banner = {
        ...state.bannerDetail.banner,
        ...action.payload
      }
    },
    onResetFormBanner: (state) => {
      state.bannerDetail.banner = initBanner
    }
  },
  extraReducers: {
    [fetchAsyncBanner.pending]: (state) => {
      return { ...state, status: STATUS.LOADING }
    },
    [fetchAsyncBanner.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        banner: {
          ...state.banner,
          page: payload.current_page,
          data: payload.data,
          total: payload.total
        },
        status: STATUS.SUCCESS,
      }
    },
    [fetchAsyncBanner.rejected]: (state) => {
      return { ...state, status: STATUS.FAIL }
    },
    //get detail banner
    [fetchAsyncBannerDetail.pending]: (state) => {
      return { ...state, bannerDetail: { ...state.bannerDetail, status: STATUS.LOADING } }
    },
    [fetchAsyncBannerDetail.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        bannerDetail: {
          banner: payload,
          status: STATUS.SUCCESS
        }
      }
    },
    [fetchAsyncBannerDetail.pending]: (state) => {
      return { ...state, bannerDetail: { ...state.bannerDetail, status: STATUS.FAIL } }
    },
  },
})
const { actions } = bannerSlice;
export const { onResetFormBanner, onChangeValueBanner, onSortTableBanner } = actions
export default bannerSlice.reducer
