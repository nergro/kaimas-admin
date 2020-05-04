import axios from 'axios';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin';
import { removeLocalUser } from 'Helpers/localUser';
import { getUserProperty } from 'Helpers/localUser';

export default async (type, params) => {
  if (type === AUTH_LOGIN) {
    const { isAuth } = params;

    return isAuth ? Promise.resolve() : Promise.reject();
  }
  if (type === AUTH_LOGOUT) {
    removeLocalUser();
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    return Promise.reject();
  }
  if (type === AUTH_CHECK) {
    const token = getUserProperty('token');
    const localUserId = getUserProperty('id');
    const localUserType = getUserProperty('userType');

    var config = {
      headers: { Authorization: 'Bearer ' + token },
    };
    if (!token || !localUserId || !localUserType) {
      return Promise.reject();
    }
    try {
      const {
        data: { id, userType },
      } = await axios.get(`/user/verify`, config);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      if (localUserId === id && localUserType === userType) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return Promise.resolve();
      } else {
        return Promise.reject();
      }
    } catch (error) {
      return Promise.reject();
    }
  }
  if (type === AUTH_GET_PERMISSIONS) {
    const localUserType = getUserProperty('userType');
    return Promise.resolve(localUserType);
  }
  return Promise.reject('Unknown method');
};
