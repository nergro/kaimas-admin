import { user } from './resources';

const actions = async (type, resource, params) => {
  switch (resource) {
    case 'user': {
      return user(type, params, resource);
    }
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
};

export default (type, resource, params) => {
  return actions(type, resource, params);
};
