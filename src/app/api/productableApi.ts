import { QrProductable } from "@types";
import { ResponseList } from "@types";
import { Productable } from "app/interface";
import { axiosV3Client } from "configs";

export const productableApi = {
  getAll: (qr: QrProductable) => {
    return axiosV3Client.get('/productables', { params: qr }).then<ResponseList<Productable[]>>(res => res.data.context)
  }
}