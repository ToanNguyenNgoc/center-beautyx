import { IAccountState } from "./account/accountSlice";
import { IBannerState } from "./banner/bannerSlice";
import { IINITIALSTATE } from './product/productSlice'
import { IState } from './loginSlice';
import { IOrdersState } from './orders/ordersSlice'
import { ISetupHome } from './setup-home'

export interface IRoot {
    ACCOUNT: IAccountState
    BANNER: IBannerState
    LOGIN: IState
    TOP_PRODUCT: IINITIALSTATE
    ORDERS: IOrdersState
    HOME_SETUP: ISetupHome
}