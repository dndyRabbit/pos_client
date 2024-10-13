// utils/cookies.js
import Cookies from 'js-cookie';

let storageItem = null;

if (typeof window !== 'undefined') {
  storageItem = localStorage;
}

export const setCookie = (key, value, options = {}) => {
    Cookies.set(key, value, options);
};

export const getCookie = (key) => {
    return Cookies.get(key);
};

export const clearCookie = (key) => {
    Cookies.remove(key);
};

export const setCurrentUser = (user) => {
    try {
      if (user) {
        storageItem?.setItem('current_user', JSON.stringify(user));
      } else {
        storageItem?.removeItem('current_user');
      }
    } catch (error) {
      console.log('>>>>: src/helpers/Utils.js : setCurrentUser -> error', error);
    }
};

export const getCurrentUser = () => {
    let user = null;
    try {
      user =
        storageItem?.getItem('current_user') != null
          ? JSON.parse(storageItem?.getItem('current_user'))
          : null;
    } catch (error) {
      console.log('>>>>: src/helpers/Utils.js  : getCurrentUser -> error', error);
      user = null;
    }
    return user;
};

export const setAccessToken = (payload) => {
    return storageItem?.setItem('access_token', payload);
};
export const setRefreshToken = (payload) => {
    return storageItem?.setItem('refresh_token', payload);
};
export const getAccessToken = () => {
    return storageItem?.getItem('access_token') ?? '';
};
export const getRefreshToken = () => {
    return storageItem?.getItem('refresh_token') ?? '';
};
export const setFnbEntity = (payload) => {
  return storageItem?.setItem('fnb', payload);
};
export const getFnbEntity = () => {
  return storageItem?.getItem('refresh_token') ?? '';
};


