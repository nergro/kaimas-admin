import axios from 'axios';
import { stringify } from 'query-string';
import { DELETE, GET_LIST, GET_ONE, CREATE, UPDATE, DELETE_MANY, GET_MANY } from 'react-admin';

export const activityCategory = async (type, params, resource) => {
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
      const {
        data: { id, name },
      } = await axios.get(`/activitycategory/${params.id}`);

      return {
        data: { id, name },
      };
    }
    case GET_MANY: {
      const {
        data: { items },
      } = await axios.get(`/activitycategory`);
      return { data: items };
    }
    case CREATE: {
      try {
        const { name } = params.data;

        const { data } = await axios.post('/activitycategory', {
          name,
        });

        return { data };
      } catch (error) {
        if (error.response) {
          throw new Error(error.response.data.error);
        }
        throw new Error('Server error');
      }
    }
    case UPDATE: {
      try {
        const { id, name } = params.data;

        await axios.put(`/activitycategory/${id}`, {
          name,
        });

        return { data: params };
      } catch (err) {
        throw new Error('Server error');
      }
    }
    case DELETE: {
      const { id } = params;
      const { data } = await axios.delete(`/activitycategory/${id}`);
      return { data };
    }
    case DELETE_MANY: {
      const { ids } = params;
      await axios.delete(`/activitycategory`, { data: { ids } });
      return { data: ids };
    }
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
};
