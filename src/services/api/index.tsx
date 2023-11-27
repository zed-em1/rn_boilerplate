import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AsyncClient } from '../../utills';
import { ASYNCSTORAGE_KEYS } from '../../constants';

Axios.interceptors.response.use(
  (response) => response,
  (response) => {
    if (response.response.status == 401) {
      try {
        AsyncClient.removeItem('user').then(() => {
          //NavigationService.reset_0('LoginScreen');
        });
      } catch (err) {
        console.warn(err);
      }
    }
    return response.response;
  }
);

Axios.interceptors.request.use(async (config) => {
  try {
    // console.log('Detect API Call', config);
    const token = await AsyncClient.getItem(ASYNCSTORAGE_KEYS.token);
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    //config.headers['x-lang'] = getLanguage;
    return config;
  } catch (error) {
    console.log(error);
  }
});

Axios.defaults.timeout = 10000;
Axios.defaults.timeoutErrorMessage = 'timeout';

export default class ApiCaller {
  static Get = (url = '', headers = {}, params = {}) =>
    Axios.get(url, {
      params: params,
      headers: { 'Content-Type': 'application/json', ...headers },
    })
      .then((res) => res)
      .catch((err) => err.response);

  static Post = async (url = '', body = {}, headers = {}) =>
    Axios.post(url, body, {
      headers: { ...headers },
    })
      .then((res) => res)
      .catch((err) => err);

  static Put = (url = '', body = {}, headers = {}) =>
    Axios.put(url, body, {
      headers: { 'Content-Type': 'application/json', ...headers },
    })
      .then((res) => res)
      .catch((err) => err.response);

  static Patch = (url = '', body = {}, headers = {}) =>
    Axios.patch(url, body, {
      headers: { 'Content-Type': 'application/json', ...headers },
    })
      .then((res) => res)
      .catch((err) => err.response);

  static Delete = (url = '', body = {}, headers = {}) =>
    Axios.delete(url, {
      headers: { ...headers },
      data: body,
    })
      .then((res) => res)
      .catch((err) => err.response);
}
