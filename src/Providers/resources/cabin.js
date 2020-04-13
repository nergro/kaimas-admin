import axios from 'axios';
import { stringify } from 'query-string';
import { DELETE, GET_LIST, GET_ONE, CREATE, UPDATE, DELETE_MANY, GET_MANY } from 'react-admin';

const uploadImage = (formData) =>
  fetch('https://api.cloudinary.com/v1_1/dmckzsz3u/image/upload', {
    method: 'POST',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: formData,
  }).then((x) => x.json());

const getFormData = (image, location) => {
  const formData = new FormData();
  const uniqueFileName = image.name + '-' + new Date().toISOString();

  formData.append('file', image);
  formData.append('tags', 'cabins');
  formData.append('upload_preset', 'crorr0g4');
  formData.append('api_key', '175283364765328');
  formData.append('timestamp', (Date.now() / 1000) | 0);
  formData.append('public_id', `${location}/${uniqueFileName}`);
  return formData;
};

export const cabin = async (type, params, resource) => {
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
        data: {
          id,
          nameLT,
          nameEN,
          descriptionLT,
          descriptionEN,
          capacity,
          price,
          images,
          availableDates,
          benefits,
        },
      } = await axios.get(`/cabin/${params.id}`);
      return {
        data: {
          id,
          nameLT,
          nameEN,
          descriptionLT,
          descriptionEN,
          capacity,
          price,
          images: images.map((x) => ({ url: x.imageUrl, ...x })),
          availableDates,
          benefits,
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
        const {
          nameLT,
          nameEN,
          descriptionLT,
          descriptionEN,
          capacity,
          price,
          images,
          benefits,
        } = params.data;

        let uploadedImages = [];
        if (images) {
          const uploadedImagesData = await Promise.all(
            images.map((image) => uploadImage(getFormData(image.rawFile, 'cabins')))
          );

          uploadedImages = uploadedImagesData.map((image) => ({
            imageUrl: image.secure_url,
            imageId: image.public_id,
          }));
        }
        const { data } = await axios.post('/cabin', {
          nameLT,
          nameEN,
          descriptionLT,
          descriptionEN,
          capacity,
          price,
          images: uploadedImages,
          benefits,
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
        const {
          id,
          nameLT,
          nameEN,
          descriptionLT,
          descriptionEN,
          capacity,
          price,
          images,
          benefits,
        } = params.data;
        let uploadedImages = [];
        let mappedOld = [];
        if (images) {
          const newImages = images.filter((image) => image.rawFile);
          const oldImages = images.filter((image) => !image.rawFile);

          mappedOld = oldImages.map((image) => ({
            imageUrl: image.imageUrl,
            imageId: image.imageId,
          }));

          const uploadedImagesData = await Promise.all(
            newImages.map((image) => uploadImage(getFormData(image.rawFile, 'cabins')))
          );

          uploadedImages = uploadedImagesData.map((image) => ({
            imageUrl: image.secure_url,
            imageId: image.public_id,
          }));
        }

        await axios.put(`/cabin/${id}`, {
          nameLT,
          nameEN,
          descriptionLT,
          descriptionEN,
          capacity,
          price,
          images: [...mappedOld, ...uploadedImages],
          benefits,
        });

        return { data: params };
      } catch (err) {
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
