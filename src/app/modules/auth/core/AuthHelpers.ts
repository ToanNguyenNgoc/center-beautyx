import { AuthModel } from './_models'

const AUTH_LOCAL_STORAGE_KEY = 'bt-auth'
const ROLE_KEY = 'r-auth'
const AUTH_LOCAL_TOKEN = 't-auth'

const getAuth = (): AuthModel | undefined => {
  if (!sessionStorage) {
    return
  }

  const lsValue: string | null = sessionStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: AuthModel) => {
  if (!sessionStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)

    sessionStorage.setItem(AUTH_LOCAL_TOKEN, auth.token + '');
    sessionStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
    //temple white response user profile is not roles /profile
    sessionStorage.setItem(ROLE_KEY, auth.roles)

  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  if (!sessionStorage) {
    return
  }
  try {
    sessionStorage.removeItem(AUTH_LOCAL_TOKEN)
    sessionStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
    sessionStorage.removeItem(ROLE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: { headers: { Authorization: string } }) => {
      const auth = getAuth()
      if (auth && auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}

export { getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY, AUTH_LOCAL_TOKEN, ROLE_KEY }