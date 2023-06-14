import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import InitRoute from './InitRoute'

interface IProps {
  USER_ROLE: string
}
interface IRoutes {
  path: string
  element: JSX.Element
}

const PrivateRoutes = (props: IProps) => {
  //
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const ApprovesPage = lazy(() => import('../pages/approves'))
  const ContractsPage = lazy(() => import('../pages/contracts'))
  const ContractsDetailPage = lazy(() => import('../pages/contracts/module/contract-detail'))

  const TrendsPage = lazy(() => import('../pages/trends'))
  const TrendFormPage = lazy(() => import('../pages/trends/module/trend-form'))
  const ServiceFormPage = lazy(() => import('../pages/services/module/ServiceForm'))

  // end

  const routes: IRoutes[] = [
    {
      path: 'crafted/pages/profile/*',
      element: <ProfilePage />,
    },
    {
      path: 'crafted/pages/wizards/*',
      element: <WizardsPage />,
    },
    {
      path: 'crafted/account/*',
      element: <AccountPage />,
    },
    {
      path: 'apps/chat/*',
      element: <ChatPage />,
    },
    {
      path: 'apps/user-management/*',
      element: <UsersPage />,
    },
    //
    // temple page approve, contract
    {
      path: 'pages/approves',
      element: <ApprovesPage />,
    },
    {
      path: 'pages/contracts',
      element: <ContractsPage />,
    },
    {
      path: 'pages/contracts/:id',
      element: <ContractsDetailPage />,
    },
    {
      path: 'pages/trends',
      element: <TrendsPage />,
    },
    {
      path: '/pages/trend-form',
      element: <TrendFormPage />,
    },
    {
      path: '/pages/trend-form/:id',
      element: <TrendFormPage />,
    },
    {
      path: '/pages/service-form/:id',
      element: <ServiceFormPage />,
    },
    {
      path: '/pages/service-form/view_service/:id',
      element: <ServiceFormPage />,
    },
  ]

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        {routes.map((item: IRoutes, index: number) => (
          <Route
            // path={item.ROLE.includes(USER_ROLE) ? item.path : "*"}
            path={item.path}
            key={index}
            element={
              // item.ROLE.includes(USER_ROLE) ?
              //   <SuspensedView>
              //     {item.element}
              //   </SuspensedView>
              //   :
              //   <Navigate to='/error/404' />
              <SuspensedView>{item.element}</SuspensedView>
            }
          />
        ))}
        {InitRoute.map((item: any, index: number) => (
          <Route
            key={index}
            path={item.path}
            element={<SuspensedView>{item.element}</SuspensedView>}
          />
        ))}
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
