export const setLocalUser = (id, name, token, userType) => {
  const user = {
    id,
    name,
    token,
    userType,
  };
  localStorage.setItem('user', JSON.stringify(user));
};
export const removeLocalUser = () => {
  localStorage.removeItem('user');
};

export const getUserProperty = (property) => {
  if (localStorage.getItem('user')) {
    let user = JSON.parse(localStorage.getItem('user'));
    return user[property];
  } else return undefined;
};
