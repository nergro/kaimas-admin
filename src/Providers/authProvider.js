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
    // make this reject in production (probably) and uncomment removeLocalUser
    // removeLocalUser();
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    const token = getUserProperty('token');
    const localUserId = getUserProperty('id');
    const localUserType = getUserProperty('userType');

    var config = {
      headers: { Authorization: token },
    };
    const {
      data: { id, userType },
    } = await axios.get(`/user/verify`, config);

    return localUserId === id && localUserType === userType ? Promise.resolve() : Promise.reject();
  }
  if (type === AUTH_GET_PERMISSIONS) {
    const permissions = getUserProperty('permissions');
    return Promise.resolve(permissions);
  }
  return Promise.reject('Unknown method');
};
