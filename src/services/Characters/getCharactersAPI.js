import api from '../api';

export async function getUserCharacters(token) {
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let returnData;
  const response = await api.get('/characters/user', request).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}

export async function getAllCharacters(token) {
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let returnData;
  const response = await api.get('/characters/all', request).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}

export async function getAllWeapons(token) {
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let returnData;
  const response = await api.get('/characters/weapons', request).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}

export async function getAllElements(token) {
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let returnData;
  const response = await api.get('/characters/elements', request).catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}

export async function postUserCharacter(token, newUserCharacter) {
  //console.log(token, newUserCharacter);
  let returnData = null;

  //console.log(newUserCharacter);
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await api
    .post('/characters/user', newUserCharacter, request)
    .catch((err) => (returnData = err.toJSON()));
  return returnData ? returnData : response.data;
}
