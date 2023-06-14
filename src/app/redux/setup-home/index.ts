import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bannerApi from 'app/api/bannerApi'
import { IBanner } from 'app/interface/banner'

export interface ISetupHome {
    sections: any[],
    sectionFocus: any,
    banners: IBanner[]
}
const initialState: ISetupHome = {
    sections: [],
    banners: [],
    sectionFocus: null
}
export const fetchAsyncBanners:any = createAsyncThunk(
    "HOME_SETUP/fetchAsyncBanners",
    async () => {
        const res = await bannerApi.getAll()
        return res.data.context.data
    }
)
const setupHomeSlice = createSlice({
    initialState,
    name: "HOME_SETUP",
    reducers: {
        onAddNewSection: (state, action) => {
            const newSection = action.payload
            const iIndex = state.sections.findIndex(i => i.id === action.payload.id)
            if (iIndex < 0) {
                state.sections.push(newSection)
            }
        },
        onFocusSection: (state, action) => {
            state.sectionFocus = action.payload
        },
        onSortTableBanners:(state, action) =>{
            state.banners = action.payload
            console.log(action.payload)
        }
    },
    extraReducers: {
        [fetchAsyncBanners.pending.toString()]: (state) => {
            return state
        },
        [fetchAsyncBanners.fulfilled.toString()]: (state, { payload }) => {
            state.banners = payload
        },
        [fetchAsyncBanners.rejected.toString()]: (state) => {
            return state
        },
    }
})
const { reducer, actions } = setupHomeSlice
export const { onAddNewSection, onFocusSection, onSortTableBanners } = actions
export default reducer