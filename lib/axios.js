import axios from 'axios';

export const postData = async (endpoint, data) => {
  const res = await axios.post(`/api/${endpoint}`, data);
  return res;
};
