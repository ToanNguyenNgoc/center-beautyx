import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'

const merchantsBreadcrumbs: Array<PageLink> = [
    {
      title: 'Merchants Management',
      path: '/apps/merchant-management/merchants',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]
const MerchantsPage = () => {
    return (
        <Routes>
          <Route element={<Outlet />}>
            <Route
              path='users'
              element={
                <>
                  <PageTitle breadcrumbs={merchantsBreadcrumbs}>Merchants list</PageTitle>
                </>
              }
            />
          </Route>
          <Route index element={<Navigate to='/apps/user-management/users' />} />
        </Routes>
      )
}
export default MerchantsPage;