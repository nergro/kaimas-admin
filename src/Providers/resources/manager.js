import axios from 'axios';
import { stringify } from 'query-string';
import { DELETE, GET_LIST, GET_ONE, CREATE, UPDATE, DELETE_MANY } from 'react-admin';
import generator from 'generate-password';

export const manager = async (type, params, resource) => {
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

      const url = `/user?${stringify(query)}`;
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
        data: { id, name, lastName, email, phone },
      } = await axios.get(`/user/${params.id}`);

      return {
        data: { id, name, lastName, email, phone },
      };
    }
    case CREATE: {
      try {
        const { name, lastName, email, phone } = params.data;

        const generatedPassword = generator.generate({ length: 10, numbers: true });

        const { data } = await axios.post('/user/createmanager', {
          name,
          lastName,
          email,
          phone,
          password: generatedPassword,
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
        return { data: params };
      } catch (err) {
        console.log(err);
        throw new Error('Server error');
      }
    }
    case DELETE: {
      const { id } = params;
      const { data } = await axios.delete(`/user/${id}`);
      return { data };
    }
    case DELETE_MANY: {
      const { ids } = params;
      await axios.delete(`/user`, { data: { ids } });
      return { data: ids };
    }
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
};
