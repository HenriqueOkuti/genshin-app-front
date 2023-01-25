import api from '../api';

export async function getUser(token) {
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let returnData;
  const response = await api.get('/users/info', request).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}
