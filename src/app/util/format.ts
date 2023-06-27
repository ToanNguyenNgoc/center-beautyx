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
export const slugify = (name: string) => {
  const a = `àáäâãåăæąçćčđďèéěėëêęğǵḧìíïîįłḿǹńňñòóöôœøṕŕřßşśšșťțùúüûǘůűūųẃẍÿýźžż·/_,:;`
  const b = `aaaaaaaaacccddeeeeeeegghiiiiilmnnnnooooooprrsssssttuuuuuuuuuwxyyzzz------`
  const p = new RegExp(a.split('').join('| '), 'g')
  return name?.toString()?.toLowerCase()
    .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a')
    .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e')
    .replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i')
    .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o')
    .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u')
    .replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y')
    .replace(/đ/gi, 'd')
    .replace(/\s+/g, '-')
    .replace(p, (c: any) => b.charAt(a.indexOf(c)))
    .replace(/&/g, '-and -')
    // eslint-disable-next-line no-useless-escape
    .replace(/[^\w\-]+/g, '')
    // eslint-disable-next-line no-useless-escape
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}
