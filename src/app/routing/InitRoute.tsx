import { lazy } from "react"
import {
    OrgMobaGalleries,
    OrgServicesCate,
    OrgServices,
    OrgProductCates,
    OrgProducts,
    OrgOrders
} from '../pages-organization'
//----

const SetupHomePage = lazy(() => import('../pages/setup-home'))

const BannersPage = lazy(() => import("../pages/banners/index"))
const BannersDetailPage = lazy(() => import("../pages/banners/module/BannerAdd"))
const BannersFormPage = lazy(() => import("../pages/banners/module/BannerAdd"))

const DiscountsPage = lazy(() => import("../pages/discounts/index"))
const DiscountsDetailPage = lazy(() => import("../pages/discounts/module/discount-detail"))
const DiscountsFormPage = lazy(() => import("../pages/discounts/module/discount-form"))

const OrdersPage = lazy(() => import('../pages/orders/index'))
const UsersPage = lazy(() => import('../pages/users'))
const Organizations = lazy(() => import('../pages/organizations'))
const OrganizationsDetailPage = lazy(() => import('../pages/organizations/module/organizations-detail'))
const ServicesPage = lazy(() => import('../pages/services'))
const ProductsPage = lazy(() => import('../pages/products'))
const RolesPage = lazy(() => import('../pages/roles'))
const PermissionsPage = lazy(() => import('../pages/permissions'))

//-------------
// const OrgMobaGalleriesPage = lazy(() => import('../pages-organization/moba-galleries'))

const InitRoute: any[] = [
    {
        path: "pages/setup-home",
        element: <SetupHomePage />
    },
    //banner
    {
        path: "pages/banners/*",
        element: <BannersPage />
    },
    {
        path: "pages/banners/:id",
        element: <BannersDetailPage />
    },
    {
        path: "pages/banners-form",
        element: <BannersFormPage />
    },
    {
        path: "pages/banners-form/:id",
        element: <BannersFormPage />
    },
    //discount
    {
        path: "pages/discounts/*",
        element: <DiscountsPage />
    },
    {
        path: "pages/discounts/:id",
        element: <DiscountsDetailPage />
    },
    {
        path: "pages/discounts-form",
        element: <DiscountsFormPage />
    },
    {
        path: "pages/discounts-form/:id",
        element: <DiscountsFormPage />
    },
    //order
    {
        path: "pages/orders",
        element: <OrdersPage />
    },
    //user
    {
        path: "pages/users",
        element: <UsersPage />
    },
    //organization
    {
        path: "pages/organizations",
        element: <Organizations />
    },
    {
        path: "pages/organizations/:id",
        element: <OrganizationsDetailPage />
    },
    //
    {
        path: "pages/services",
        element: <ServicesPage />
    },
    {
        path: "pages/products",
        element: <ProductsPage />
    },
    //-------------------------------
    //page dependencies [ORGANIZATION-DETAIL]
    {
        path: "pages/organizations/:id/moba-galleries",
        element: <OrgMobaGalleries />
    },
    {
        path: "pages/organizations/:id/service-categories",
        element: <OrgServicesCate />
    },
    {
        path: "pages/organizations/:id/services",
        element: <OrgServices />
    },
    {
        path: "pages/organizations/:id/product-categories",
        element: <OrgProductCates />
    },
    {
        path: "pages/organizations/:id/products",
        element: <OrgProducts />
    },
    {
        path: "pages/organizations/:id/orders",
        element: <OrgOrders />
    },
    {
        path: "pages/roles",
        element: <RolesPage />
    },
    {
        path: "pages/roles/:id/permissions",
        element: <PermissionsPage />
    }


]
export default InitRoute