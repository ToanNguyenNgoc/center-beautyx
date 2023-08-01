import { QrCustomer, ResponseList } from "@types";
import { Customer } from "app/interface";
import { axiosClient } from "configs";

export const statisticApi = {
  customers: (qr: QrCustomer) => axiosClient
    .get('/statistics/auth/customers', { params: qr })
    .then<ResponseList<Customer[]>>(res => res.data.context)
}