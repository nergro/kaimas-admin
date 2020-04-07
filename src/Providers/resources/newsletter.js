import axios from 'axios';
import { stringify } from 'query-string';
import { DELETE, GET_LIST, GET_ONE, CREATE, DELETE_MANY } from 'react-admin';

export const newsletter = async (type, params, resource) => {
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

      const url = `/newsletter?${stringify(query)}`;
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
        data: { id, topic, content, date },
      } = await axios.get(`/newsletter/${params.id}`);

      return {
        data: { id, topic, content, date },
      };
    }
    case CREATE: {
      try {
        const { topic, content } = params.data;

        const { data } = await axios.post('/newsletter', {
          topic,
          content,
        });

        return { data };
      } catch (error) {
        if (error.response) {
          throw new Error(error.response.data.error);
        }
        throw new Error('Server error');
      }
    }
    case DELETE: {
      const { id } = params;
      const { data } = await axios.delete(`/newsletter/${id}`);
      return { data };
    }
    case DELETE_MANY: {
      const { ids } = params;
      await axios.delete(`/newsletter`, { data: { ids } });
      return { data: ids };
    }
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
};
