const directRoute = {
    ORGANIZATIONS: "/pages/organizations",
    ORGANIZATIONS_DETAIL: (id: number | string) => `/pages/organizations/${id}`,
    BANNERS_PAGE: "/pages/banners",
    BANNERS_FORM: '/pages/banners-form',
    BANNERS_FORM_EDIT: (id: number | string) => `/pages/banners-form/${id}`,
    APPROVES: '/pages/approves',
    CONTRACTS: '/pages/contracts',
    CONTRACTS_DETAIL: (id: number | string) => `/pages/contracts/${id}`,
    ROLES_ID_PERMISSIONS: (id: number | string) => `/pages/roles/${id}/permissions`
}
export default directRoute