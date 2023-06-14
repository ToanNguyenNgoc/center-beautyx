export const formatDate = (dateParams: string) => {
  let date = ''
  if (dateParams) {
    const dateArr = dateParams?.split(' ')
    const date = dateArr[0]?.split('-')?.reverse().join('/')
    return date
  }
  return date
}
export const formatTime = (dateParams: string) => {
  let date = ''
  if (dateParams) {
    const dateArr = dateParams?.split(' ')
    const date = dateArr[1]
    return date
  }
  return date
}
export const formatPrice = (num: any) => {
  return parseInt(num)?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

export const formatSalePriceService = (special_price: number, special_price_momo: number) => {
  let sale = 0
  if (special_price_momo > 0) return (sale = special_price_momo)
  if (special_price > 0) return (sale = special_price)
  return sale
}

export const formatSalePriceProduct = (special_price: number, special_price_momo: number) => {
  let sale = 0
  if (special_price_momo > 0) return (sale = special_price_momo)
  if (special_price > 0) return (sale = special_price)
  return sale
}
