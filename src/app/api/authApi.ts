import axiosClient from "./axios";
import { AUTH_HEADER } from "./config_header";
import {AUTH_LOCAL_TOKEN} from '../modules/auth/core/AuthHelpers';

import {ILOGIN,IPUT_PROFILE,IFORGOT,IREGISTER} from './interface';
class Auth {
  login = (values: ILOGIN) => {
    const url = `/auth/login`;
    const params = {
      ...values,
      "platform": "BEAUTYX"
    }
    return axiosClient.post(url, params);
  };
  register = (params: IREGISTER) => {
    const url = `/auth/register`;
    return axiosClient.post(url, params);
  };
  getUserProfile = () => {
    const url = `/users/profile`;
    if (localStorage.getItem(AUTH_LOCAL_TOKEN) || sessionStorage.getItem(AUTH_LOCAL_TOKEN)) {
      return axiosClient.get(url, AUTH_HEADER());
    }
  };
  forgotPassword = (values: IFORGOT) => {
    const url = `/auth/forgot`;
    const params = values
    return axiosClient.post(url, params)
  };
  putUserProfile = (params: IPUT_PROFILE) => {
    const url = `/users/profile`;
    return axiosClient.put(url, params, AUTH_HEADER())
  }

}
const authentication = new Auth();
export default authentication;
