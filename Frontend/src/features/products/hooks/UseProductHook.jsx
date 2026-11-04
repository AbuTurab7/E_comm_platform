import { useNavigate, useParams } from "react-router";
import { deleteProductsAPI, getAllProductsAPI, getSingleProductsAPI } from "../api/ProductsApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../../../app/api/useApi";
import { useContext } from "react";
import { MyStore } from "../../../context/authContext";
import {toast} from 'react-toastify'

export const UseGetAllProducts = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { data, isPending, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProductsAPI(api),
  });
  
  return { data, isPending, error, navigate };
};

export const UseGetSingleProduct = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isPending, error } = useQuery({
    queryKey: ["SingleProduct"],
    queryFn: () => getSingleProductsAPI(api, id),
  });
  return { data, isPending, error, navigate };
};

export const UseDeleteProduct = () => {
  const api = useApi();
  const { user } = useContext(MyStore);
  const queryClient = useQueryClient();

  const handleDelete = async (e , id) => {
    try {
      e.stopPropagation();
      if (!user) {
        toast.error("Please login first.");
        return;
      }
      const res = await deleteProductsAPI(api, id);
      console.log(res);
      toast.success(res.data.message);
      queryClient.invalidateQueries({queryKey: ["products"]});
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message;
      toast.error(message);
    }
  };
  return { handleDelete };
};
