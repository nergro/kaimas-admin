import axios from 'axios';
import { GET_ONE, UPDATE } from 'react-admin';

export const profile = async (type, params, resource) => {
  switch (type) {
    case GET_ONE: {
      const {
        data: { id, name, lastName, email, phone },
      } = await axios.get(`/user/${params.id}`);
      return {
        data: {
          id,
          name,
          lastName,
          email,
          phone,
        },
      };
    }
    case UPDATE: {
      try {
        const { password } = params.data;
        await axios.put(`/user/edit`, {
          password,
        });

        return { data: params };
      } catch (err) {
        console.log(err);
        throw new Error('Server error');
      }
    }
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
};
