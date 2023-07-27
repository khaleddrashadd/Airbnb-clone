import axios from 'axios';

export const postData = async (endpoint, data) => {
  const res = await axios.post(`/api/${endpoint}`, data);
  return res;
};

export const addTofavorite = async favId => {
  const res = await axios.post(`/api/favorite/${favId}`);
  return res;
};

export const removeFromfavorite = async favId => {
  const res = await axios.delete(`/api/favorite/${favId}`);
  return res;
};
