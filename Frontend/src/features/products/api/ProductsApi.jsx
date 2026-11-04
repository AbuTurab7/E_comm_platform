export const getAllProductsAPI = async (api) => {
  const res = await api.get("/api/products");
  return res;
};
export const getSingleProductsAPI = async (api, id) => {
  const res = await api.get(`/api/products/${id}`);
  return res;
};
export const deleteProductsAPI = async (api, id) => {
  const res = await api.delete(`/api/products/${id}`);
  return res;
};
