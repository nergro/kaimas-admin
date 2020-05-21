import axios from 'axios';
import { stringify } from 'query-string';
import { DELETE, GET_LIST, GET_ONE, CREATE, DELETE_MANY, GET_MANY } from 'react-admin';
import moment from 'moment';

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
    case GET_MANY: {
      const {
        data: { items },
      } = await axios.get(`/availabledate`);
      return { data: items };
    }
    case CREATE: {
      try {
        const { from, to, cabin, activity } = params.data;

        let serviceType = '';
        let serviceId = '';

        if (cabin) {
          serviceType = 'Cabin';
          serviceId = cabin;
        } else {
          serviceType = 'Activity';
          serviceId = activity;
        }

        const start = moment(from);
        const end = moment(to);

        const duration = moment.duration(end.diff(start));
        const days = Math.round(duration.asDays());

        const dateChunks = [];

        const day = 60 * 60 * 24 * 1000;

        for (let i = 0; i <= days; i++) {
          dateChunks.push(new Date(from.getTime() + day * i));
        }

        const { data } = await axios.post('/availabledate', {
          dateChunks,
          serviceType,
          serviceId,
        });

        return { data: data[0] };
      } catch (error) {
        if (error.response) {
          throw new Error(error.response.data.error);
        }
        throw new Error('Server error');
      }
    }
    case DELETE: {
      const { id } = params;
      const { data } = await axios.delete(`/availabledate/${id}`);
      return { data };
    }
    case DELETE_MANY: {
      const { ids } = params;
      await axios.delete(`/availabledate`, { data: { ids } });
      return { data: ids };
    }
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
};
