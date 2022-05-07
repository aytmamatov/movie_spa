import axios from 'axios';

function returnAxiosInstance() {
  return axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL
  });
}

function getDataFromServer(url) {
  const currentAxios = returnAxiosInstance();
  return currentAxios.get(url);
}

export { getDataFromServer };
