import { cabin, availableDate, benefit, activity } from './resources';

const actions = async (type, resource, params) => {
  switch (resource) {
    case 'cabin': {
      return cabin(type, params, resource);
    }
    case 'availableDate': {
      return availableDate(type, params, resource);
    }
    case 'benefit': {
      return benefit(type, params, resource);
    }
    case 'activity': {
      return activity(type, params, resource);
    }
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
};

export default (type, resource, params) => {
  return actions(type, resource, params);
};
