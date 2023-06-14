/* eslint-disable react-hooks/exhaustive-deps */
import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'
import { useDispatch } from 'react-redux';
import { fetchAsyncUser } from '../../../redux/account/accountSlice';
import { LayoutSplashScreen } from '../../../../_metronic/layout/core'
import { AuthModel, USERROLE } from './_models'
import * as authHelper from './AuthHelpers'
import { WithChildren } from '../../../../_metronic/helpers'
import { PAYLOAD_STATUS } from '../../../redux/status';
import { useSwr } from 'app/hooks';
import { API_ROUTE } from 'app/api/api-route';
import { verifyUser } from 'middleware';
import { IPermission } from 'app/interface/permissions'

type AuthContextProps = {
  auth: any | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: any | undefined | null
  setCurrentUser: Dispatch<SetStateAction<any | undefined | null>>
  logout: () => void,
  permissionsUser: IPermission[]
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => { },
  currentUser: undefined,
  setCurrentUser: () => { },
  logout: () => { },
  permissionsUser: []
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<any | undefined | null>()
  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const logout = () => {
    saveAuth(undefined)
    setCurrentUser(undefined)
  }
  //handle get permissions user
  const USER: USERROLE = currentUser
  const permissionsUser = useSwr(USER, API_ROUTE.ROLES_ID_PERMISSIONS(USER?.ROLE?.id)).response

  const value = {
    auth,
    saveAuth,
    currentUser,
    setCurrentUser,
    logout,
    permissionsUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { logout, setCurrentUser, currentUser } = useAuth()
  const [showSplashScreen, setShowSplashScreen] = useState(true)
  const [firstLoad, setFirstLoad] = useState(true)
  const dispatch = useDispatch();
  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  const requestUser = async () => {
    const res = await dispatch(fetchAsyncUser())
    if (res.meta.requestStatus === PAYLOAD_STATUS.SUCCESS) {
      const user_check = await verifyUser(res.payload)
      setCurrentUser(user_check)
      setFirstLoad(false)
      setShowSplashScreen(false)
    }
    if (!res.payload) {
      setFirstLoad(false)
      setShowSplashScreen(false)
    }
  }
  useEffect(() => {
    requestUser()
    if (!firstLoad && !currentUser) {
      logout()
    }
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export { AuthProvider, AuthInit, useAuth }
