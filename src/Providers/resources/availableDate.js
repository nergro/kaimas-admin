import axios from 'axios';
import { stringify } from 'query-string';
import { DELETE, GET_LIST, GET_ONE, CREATE, UPDATE, DELETE_MANY } from 'react-admin';

export const availableDate = async (type, params, resource) => {
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
        data: { id, serviceId, date, onModel },
      } = await axios.get(`/availabledate/${params.id}`);

      return {
        data: { id, serviceId, date, onModel },
      };
    }
    case CREATE: {
      try {
        const { name, description, capacity, price } = params.data;

        const { data } = await axios.post('/cabin', {
          name,
          description,
          capacity,
          price,
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
        const { id, name, description, capacity, price } = params.data;

        await axios.put(`/cabin/${id}`, {
          name,
          description,
          capacity,
          price,
        });

        return { data: params };
      } catch (err) {
        console.log(err);
        throw new Error('Server error');
      }
    }
    case DELETE: {
      const { id } = params;
      const { data } = await axios.delete(`/cabin/${id}`);
      return { data };
    }
    case DELETE_MANY: {
      const { ids } = params;
      await axios.delete(`/cabin`, { data: { ids } });
      return { data: ids };
    }
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
};
