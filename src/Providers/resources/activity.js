import axios from 'axios';
import { stringify } from 'query-string';
import { DELETE, GET_LIST, GET_ONE, CREATE, UPDATE, DELETE_MANY, GET_MANY } from 'react-admin';

const uploadImage = formData =>
  axios.post('https://api.cloudinary.com/v1_1/dmckzsz3u/image/upload', formData, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

const getFormData = (image, location) => {
  const formData = new FormData();
  const uniqueFileName = image.name + '-' + new Date().toISOString();

  formData.append('file', image);
  formData.append('tags', 'activities');
  formData.append('upload_preset', 'crorr0g4');
  formData.append('api_key', '175283364765328');
  formData.append('timestamp', (Date.now() / 1000) | 0);
  formData.append('public_id', `${location}/${uniqueFileName}`);
  return formData;
};

export const activity = async (type, params, resource) => {
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
        data: { id, name, category, description, capacity, price, images },
      } = await axios.get(`/activity/${params.id}`);

      return {
        data: {
          id,
          name,
          category,
          description,
          capacity,
          price,
          images: images.map(x => ({ url: x.imageUrl, ...x })),
        },
      };
    }
    case GET_MANY: {
      const {
        data: { items },
      } = await axios.get(`/cabin`);
      return { data: items };
    }
    case CREATE: {
      try {
        const { name, category, description, capacity, price, images } = params.data;

        const uploadedImagesData = await Promise.all(
          images.map(image => uploadImage(getFormData(image.rawFile, 'activities')))
        );

        const uploadedImages = uploadedImagesData.map(image => ({
          imageUrl: image.data.secure_url,
          imageId: image.data.public_id,
        }));

        const { data } = await axios.post('/activity', {
          name,
          category,
          description,
          capacity,
          price,
          images: uploadedImages,
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
        const { id, name, category, description, capacity, price, images } = params.data;
        const newImages = images.filter(image => image.rawFile);
        const oldImages = images.filter(image => !image.rawFile);

        const mappedOld = oldImages.map(image => ({
          imageUrl: image.imageUrl,
          imageId: image.imageId,
        }));

        const uploadedImagesData = await Promise.all(
          newImages.map(image => uploadImage(getFormData(image.rawFile, 'activities')))
        );

        const uploadedImages = uploadedImagesData.map(image => ({
          imageUrl: image.data.secure_url,
          imageId: image.data.public_id,
        }));

        await axios.put(`/activity/${id}`, {
          name,
          category,
          description,
          capacity,
          price,
          images: [...mappedOld, ...uploadedImages],
        });

        return { data: params };
      } catch (err) {
        console.log(err);
        throw new Error('Server error');
      }
    }
    case DELETE: {
      try {
        const { id } = params;
        const { data } = await axios.delete(`/activity/${id}`);
        return { data };
      } catch (error) {
        throw new Error('Server error');
      }
    }
    case DELETE_MANY: {
      try {
        const { ids } = params;
        await axios.delete(`/activity`, { data: { ids } });
        return { data: ids };
      } catch (error) {
        throw new Error('Server error');
      }
    }
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
  }
};
