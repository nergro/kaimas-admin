import {
  cabin,
  availableDate,
  benefit,
  activity,
  activityCategory,
  manager,
  newsletter,
} from './resources';

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
    case 'activityCategory': {
      return activityCategory(type, params, resource);
    }
    case 'manager': {
      return manager(type, params, resource);
    }
    case 'newsletter': {
      return newsletter(type, params, resource);
    }
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
};

export default (type, resource, params) => {
  return actions(type, resource, params);
};
