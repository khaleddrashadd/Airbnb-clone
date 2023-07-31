import axios from 'axios';

export const postData = async (endpoint, data) => {
  const res = await axios.post(`/api/${endpoint}`, data);
  return res;
};

export const addTofavorite = async favId => {
  const res = await axios.post(`/api/favorite/${favId}`);
  return res;
};

export const removeData = async (endpoint,id) => {
  const res = await axios.delete(`/api/${endpoint}/${id}`);
  return res;
};
