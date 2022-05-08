import axios from 'axios';
import { API_KEY } from 'src/config';

function returnAxiosInstance() {
  return axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL
  });
}

function returnApiKeyToUrl(url) {
  const hasQueryParams = url.match(/\?/gi);
  return `${url}${hasQueryParams ? `&api_key=${API_KEY}` : `?api_key=${API_KEY}`}`;
}

function getDataFromServer(url) {
  const currentAxios = returnAxiosInstance();
  const addedApiKey = returnApiKeyToUrl(url);
  return currentAxios.get(addedApiKey);
}

export { getDataFromServer };
