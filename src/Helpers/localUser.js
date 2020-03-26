export const setLocalUser = (
    id,
    name,
    token,
    permissions,
    userType,
    organizationId
) => {
    const user = {
        id,
        name,
        organizationId,
        permissions,
        token,
        userType
    };
    localStorage.setItem('user', JSON.stringify(user));
};
export const removeLocalUser = () => {
    localStorage.removeItem('user');
};

export const getUserProperty = property => {
    if (localStorage.getItem('user')) {
        let user = JSON.parse(localStorage.getItem('user'));
        return user[property];
    } else return undefined;
};
