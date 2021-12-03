import axios from "axios";

/**
 * This page contains all the types of request and response
 *
 */
const API_HTTP_PORT = process.env.API_PORT ? process.env.API_PORT : 8000;
const API_HOST = process.env.API_HOST ? process.env.API_HOST : "localhost";

const instance = axios.create({
  baseURL: `http://${API_HOST}:${API_HTTP_PORT}/api`,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },

  withCredentials: true,
});

const responseBody = (response) => response.data;

const responseError = (err) => {
  if (axios.isAxiosError(err)) {
    throw err.response?.data.message || err.response?.data.error;
  } else {
    throw err.message;
  }
};

const requests = {
  get: (url) => instance.get(url).then(responseBody).catch(responseError),
  post: (url, body) =>
    instance.post(url, body).then(responseBody).catch(responseError),
  put: (url, body) =>
    instance.put(url, body).then(responseBody).catch(responseError),
  delete: (url) => instance.delete(url).then(responseBody).catch(responseError),
};

export default requests;
