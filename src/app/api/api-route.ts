export const DOMAIN = 'https://beautyx.blackops.click/v1'
export const API_ROUTE = {
  BANNERS: '/banners',
  BANNERS_ID: (id: number | string) => `/banners/${id}`,
  DISCOUNTS: '/discounts',
  DISCOUNTS_ID: (id: number | string) => `/discounts/${id}`,
  ORGANIZATIONS: '/organizations',
  ORGANIZATIONS_ID: (id: number | string) => `/organizations/${id}`,
  ROLES: '/roles',
  ROLES_ID_PERMISSIONS: (id: number | string) => `/roles/${id}/permissions`,
  PERMISSIONS: '/permissions',
  APPROVES: '/approves',
  APPROVES_BY_ID: (id: number | string) => `/approves/${id}`,
  CONTRACTS: '/contracts',
  CONTRACTS_BY_ID: (id: number | string) => `/contracts/${id}`,
  ORDERS: '/orders',
  ORDERS_ID: (id: number | string) => `/orders/${id}`,
  SERVICES: '/services',
  PRODUCTS: '/products',
}
export const API_3RD = {
  VIEW_COUNT: `${DOMAIN}/history/view`,
  LOGIN: `${DOMAIN}/auth/login`,
  TRENDS: `${DOMAIN}/trends`,
  TRENDS_DETAIL: (id: number | string) => `${DOMAIN}/trends/${id}`,
  ORGANIZATIONS: `${DOMAIN}/organizations`,
  ORG_SERVICES: (org_id: number) => `${DOMAIN}/organizations/${org_id}/services`,
}
