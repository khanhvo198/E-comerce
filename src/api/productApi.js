import axiosClient from "./axiosClient";

const productApi = {
  getAll: (params) => {
    const url = '/api/products';
    return axiosClient.get(url, { params });
  },

  get: (id) => {
    const url = `/api/products/${id}`;
    return axiosClient.get(url);
  },
}

export default productApi;