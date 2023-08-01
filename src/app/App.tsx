import { LocalizationProvider } from '@mui/x-date-pickers'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { I18nProvider } from '../_metronic/i18n/i18nProvider'
import { LayoutProvider, LayoutSplashScreen } from '../_metronic/layout/core'
import { MasterInit } from '../_metronic/layout/MasterInit'
import { AuthInit } from './modules/auth';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { requestForToken } from 'configs/firebase.config'

const App = () => {
  // requestForToken()
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <LocalizationProvider dateAdapter={AdapterDateFns} >
        <I18nProvider>
          <LayoutProvider>
            <AuthInit>
              <Outlet />
              <MasterInit />
            </AuthInit>
          </LayoutProvider>
        </I18nProvider>
      </LocalizationProvider>
    </Suspense>
  )
}

export { App }
