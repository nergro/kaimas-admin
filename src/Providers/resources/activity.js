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
        data: {
          id,
          nameLT,
          nameEN,
          category,
          descriptionLT,
          descriptionEN,
          capacity,
          address,
          price,
          images,
          availableDates,
          benefits,
          thumbnail,
        },
      } = await axios.get(`/activity/${params.id}`);

      return {
        data: {
          id,
          nameLT,
          nameEN,
          category,
          descriptionLT,
          descriptionEN,
          capacity,
          address,
          price,
          images: images.map((x) => ({ url: x.imageUrl, ...x })),
          availableDates,
          benefits,
          thumbnail: { url: thumbnail.imageUrl, ...thumbnail },
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
          category,
          descriptionLT,
          descriptionEN,
          capacity,
          address,
          price,
          images,
          benefits,
          thumbnail,
        } = params.data;
        let uploadedImages = [];
        if (images) {
          const uploadedImagesData = await Promise.all(
            images.map((image) => uploadImage(getFormData(image.rawFile, 'activities')))
          );

          uploadedImages = uploadedImagesData.map((image) => ({
            imageUrl: image.secure_url,
            imageId: image.public_id,
          }));
        }
        const uploadedThumbnailData = await uploadImage(
          getFormData(thumbnail.rawFile, 'activities')
        );
        const uploadedThumbnail = {
          imageUrl: uploadedThumbnailData.secure_url,
          imageId: uploadedThumbnailData.public_id,
        };

        const { data } = await axios.post('/activity', {
          nameLT,
          nameEN,
          category,
          descriptionLT,
          descriptionEN,
          capacity,
          address,
          price,
          images: uploadedImages,
          benefits,
          thumbnail: uploadedThumbnail,
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
          category,
          descriptionLT,
          descriptionEN,
          capacity,
          address,
          price,
          images,
          benefits,
          thumbnail,
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
            newImages.map((image) => uploadImage(getFormData(image.rawFile, 'activities')))
          );

          uploadedImages = uploadedImagesData.map((image) => ({
            imageUrl: image.secure_url,
            imageId: image.public_id,
          }));
        }

        let uploadedThumbnail = {};

        if (thumbnail.rawFile) {
          const uploadedThumbnailData = await uploadImage(
            getFormData(thumbnail.rawFile, 'activities')
          );
          uploadedThumbnail = {
            imageUrl: uploadedThumbnailData.secure_url,
            imageId: uploadedThumbnailData.public_id,
          };
        } else {
          uploadedThumbnail = {
            imageUrl: thumbnail.imageUrl,
            imageId: thumbnail.imageId,
          };
        }

        await axios.put(`/activity/${id}`, {
          nameLT,
          nameEN,
          category,
          descriptionLT,
          descriptionEN,
          capacity,
          address,
          price,
          images: [...mappedOld, ...uploadedImages],
          benefits,
          thumbnail: uploadedThumbnail,
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
