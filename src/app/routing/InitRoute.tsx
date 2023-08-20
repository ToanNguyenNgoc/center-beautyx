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

const PromotionsPage = lazy(() => import("../pages/promotions"))
const PromotionFormPage = lazy(() => import("../pages/promotions/module/promotion-form"))

const CommunityPage = lazy(() => import("../pages/community"))
const CommunityFormPage = lazy(() => import('../pages/community/module/community-form'))

const PushNotificationPage = lazy(() => import('../pages/push-notification/index'))
const PushNotificationFormPage = lazy(() => import('../pages/push-notification/module/push-notification-form'))

const OrdersPage = lazy(() => import('../pages/orders/index'))
const CustomersPage = lazy(() => import('../pages/customers'))
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
    //promotion
    {
        path: "pages/promotions",
        element: <PromotionsPage />
    },
    {
        path: "pages/promotions-form",
        element: <PromotionFormPage />
    },
    {
        path: "pages/promotions-form/:id",
        element: <PromotionFormPage />
    },
    //community
    {
        path: 'pages/community-form',
        element: <CommunityFormPage />
    },
    {
        path: "pages/community",
        element: <CommunityPage />
    },
    //push notification
    {
        path: "pages/push-notifications",
        element: <PushNotificationPage />
    },
    {
        path: "pages/push-notifications-form",
        element: <PushNotificationFormPage />
    },
    {
        path: "pages/push-notifications-form/:id",
        element: <PushNotificationFormPage />
    },
    //order
    {
        path: "pages/orders",
        element: <OrdersPage />
    },
    //customers
    {
        path: "pages/customers",
        element: <CustomersPage />
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