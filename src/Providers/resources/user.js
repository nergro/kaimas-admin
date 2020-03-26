import axios from 'axios';
import { stringify } from 'query-string';
import { DELETE, GET_LIST, GET_ONE, CREATE, UPDATE } from 'react-admin';
import { baseUrl } from 'services/http';

export const user = async (type, params, resource) => {
  console.log('in User');
  switch (type) {
    case GET_LIST: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        sort: field,
        order,
        page,
        perPage,
      };

      const url = `/${resource}?${stringify(query)}`;
      const {
        data: { items, total },
      } = await axios.get(url);

      return {
        data: items,
        total: total,
      };
    }
    case GET_ONE: {
      return {
        data: {},
      };
    }
    case UPDATE: {
      try {
        return { data: params };
      } catch (err) {
        throw new Error('Server error');
      }
    }
    case CREATE: {
      return {};
    }
    case DELETE: {
      return {};
    }
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
};
