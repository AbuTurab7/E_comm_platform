export const CreateProductAPI = async (api , data) => {
    const res = await api.post("/api/products" , data);
    return res;
}