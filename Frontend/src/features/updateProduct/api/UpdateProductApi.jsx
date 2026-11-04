export const updateProductAPI = async (api, id, data) => {
  const res = await api.put(`/api/products/${id}`, data);
  return res;
};