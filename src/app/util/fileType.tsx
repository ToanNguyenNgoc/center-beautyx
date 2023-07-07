export interface IBannerType {
  id: number
  type: string
  title: string
}
export const PRODUCTABLE_TYPE = {
  PRODUCT: 'App\\Models\\CI\\Product',
  SERVICE: 'App\\Models\\CI\\Service',
}
export const FILE_IMG_TYPE = ['JPG', 'PNG', 'GIF', 'JPEG']
export const FILE_VIDEO_TYPE = ['MP4', '3GP']
export const accept_image = "image/jpeg, image/png, image/gif"
export const accept_video = "video/mp4, video/mov, video/avi, video/wmv"
export const BANNER_TYPE = {
  WEB: 'WEB',
  HTML: 'HTML',
  VIDEO: 'VIDEO',
  ORGANIZATION: 'ORGANIZATION',
  SEARCH_RESULT: 'SEARCH_RESULT',
  DISCOUNT: 'DISCOUNT',
  SERVICE: 'SERVICE',
  POPUP: 'POPUP'
}
export const DISCOUNT_TYPE = {
  SUB_TOTAL: 'SUB_TOTAL',
  PRODUCTS: 'PRODUCT',
  FINAL_PRICE: 'FINAL_PRICE',
}
export const DISCOUNTS_TYPE = [
  { id: 1, TYPE: DISCOUNT_TYPE.PRODUCTS, title: 'Giảm giá trên sản phẩm' },
  { id: 2, TYPE: DISCOUNT_TYPE.SUB_TOTAL, title: 'Giảm giá trên tổng đơn' },
  { id: 3, TYPE: DISCOUNT_TYPE.FINAL_PRICE, title: ' Giảm giá còn ' },
]
export const DISCOUNT_UNIT = {
  PRICE: 'PRICE',
  PERCENT: 'PERCENT',
}
export const DISCOUNT_UNIT_ARR = [
  { id: 1, TYPE: DISCOUNT_UNIT.PERCENT, title: 'Giảm theo phần trăm' },
  { id: 2, TYPE: DISCOUNT_UNIT.PRICE, title: 'Giảm theo giá tiền' },
]

export const BANNERS_TYPE: IBannerType[] = [
  { id: 1, type: BANNER_TYPE.WEB, title: 'Web' },
  { id: 2, type: BANNER_TYPE.HTML, title: 'HTML' },
  { id: 3, type: BANNER_TYPE.VIDEO, title: 'Video' },
  { id: 4, type: BANNER_TYPE.ORGANIZATION, title: 'Doanh nghiệp' },
  { id: 5, type: BANNER_TYPE.SEARCH_RESULT, title: 'Kết quả tìm kiếm' },
  { id: 6, type: BANNER_TYPE.DISCOUNT, title: 'Giảm giá' },
  { id: 7, type: BANNER_TYPE.SERVICE, title: 'Dịch vụ' },
  { id: 8, type: BANNER_TYPE.POPUP, title: 'Popup' }
]
export const BannerTypeElement = ({ TYPE }: { TYPE: any }) => {
  const title = BANNERS_TYPE.find((i) => i.type === TYPE)?.title
  return <span className='badge badge-light-success'>{title || 'Tất cả'}</span>
}
export const DiscountsTypeElement = ({ TYPE }: { TYPE: any }) => {
  const title = DISCOUNTS_TYPE.find((i) => i.TYPE === TYPE)?.title
  return <span className='badge badge-light-success'>{title}</span>
}
//typeof orders
export const ORDER_STATUS = {
  CANCELED_BY_USER: 'CANCELED_BY_USER',
  CANCELED: 'CANCELED',
  TIMEOUT: 'TIMEOUT',
  PENDING: 'PENDING',
  PAID: 'PAID',
}
export const ORDER_STATUS_ARR = [
  { id: 1, TYPE: ORDER_STATUS.CANCELED_BY_USER, title: 'Hủy bởi người dùng' },
  { id: 2, TYPE: ORDER_STATUS.CANCELED, title: 'Đã hủy' },
  { id: 3, TYPE: ORDER_STATUS.TIMEOUT, title: 'Quá hạn thanh toán' },
  { id: 4, TYPE: ORDER_STATUS.PENDING, title: 'Chờ thanh toán' },
  { id: 5, TYPE: ORDER_STATUS.PAID, title: 'Thanh toán thành công' },
]
export const OrderStatusElement = ({ status }: { status: string }) => {
  const onCheckOrderStatus = () => {
    switch (status) {
      case ORDER_STATUS.CANCELED_BY_USER:
        return <span className='badge badge-light-danger'>Hủy bởi người dùng</span>
      case ORDER_STATUS.CANCELED:
        return <span className='badge badge-light-danger'>Đã hủy</span>
      case ORDER_STATUS.TIMEOUT:
        return <span className='badge badge-light-danger'>Quá hạn thanh toán</span>
      case ORDER_STATUS.PENDING:
        return <span className='badge badge-light-warning'>Chờ thanh toán</span>
      case ORDER_STATUS.PAID:
        return <span className='badge badge-light-success'>Thanh toán thành công</span>
    }
  }
  return <>{onCheckOrderStatus()}</>
}

// status SerPro
export const StatusElement = ({ status }: { status: boolean }) => {
  const onCheckStatus = () => {
    switch (status) {
      case false:
        return <span className='badge badge-light-danger'>Đã tắt</span>
      case true:
        return <span className='badge badge-light-success'>Đang bật</span>
    }
  }
  return <>{onCheckStatus()}</>
}
// close status SerPro
export const APPROVE_STATUS = [
  { STATUS: 'REJECT' },
  { STATUS: 'PENDING' },
  { STATUS: 'REVIEW' },
  { STATUS: 'APPROVED' },
]
export const ApproveStatusElement = ({ status }: { status: string }) => {
  const onCheckApproveStatus = () => {
    switch (status) {
      case 'REJECT':
        return <span className='badge badge-light-danger'>Từ chối</span>
      case 'PENDING':
        return <span className='badge badge-light-warning'>Đang chờ</span>
      case 'REVIEW':
        return <span className='badge badge-light-warning'>Đang duyệt</span>
      case 'APPROVED':
        return <span className='badge badge-light-success'>Được duyệt</span>
    }
  }
  return <>{onCheckApproveStatus()}</>
}
export const ApproveTypeElement = ({ type }: { type: string }) => {
  const onCheckApproveType = () => {
    switch (type) {
      case 'ECOMMERCE_OFF':
        return <span className='badge badge-light-danger'>Tắt gian hàng</span>
      case 'ECOMMERCE_ON':
        return <span className='badge badge-light-success'>Mở gian hàng</span>
      case 'ECOMMERCE_BRANCH_OFF':
        return <span className='badge badge-light-danger'>Tắt chi nhánh</span>
      case 'ECOMMERCE_BRANCH_ON':
        return <span className='badge badge-light-success'>Mở chi nhánh</span>
    }
  }
  return <>{onCheckApproveType()}</>
}
export const StatusOrgE = ({ status }: { status: boolean }) => {
  const onCheckStatus = () => {
    switch (status) {
      case true:
        return <span className='badge badge-success'>Đang mở</span>
      case false:
        return <span className='badge badge-danger'>Đang đóng</span>
    }
  }
  return <>{onCheckStatus()}</>
}
