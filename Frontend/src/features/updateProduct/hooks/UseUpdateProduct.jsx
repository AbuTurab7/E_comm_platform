import { useNavigate, useParams } from "react-router";
import { useApi } from "../../../app/api/useApi";
import { useContext } from "react";
import { MyStore } from "../../../context/AuthContextProvider";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { updateProductAPI } from "../api/UpdateProductApi";
import { getSingleProductsAPI } from "../../products/api/ProductsApi";
import { useQuery } from "@tanstack/react-query";

export const UseUpdateProduct = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { user } = useContext(MyStore);
  const { id } = useParams();

  const { data, isPending, error } = useQuery({
    queryKey: ["SingleProduct"],
    queryFn: () => getSingleProductsAPI(api, id),
  });

  let product = data?.data?.data?.product;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    values: product,
  });

  const handleFormData = async (data) => {
    try {
      if (!user) {
        toast.error("Please login first.");
        return;
      }
      const res = await updateProductAPI(api, id, data);

      toast.success(res.data.message);
      navigate("/main/products");
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message;
      toast.error(message);
    }
  };
  return {
    isPending,
    error,
    register,
    handleSubmit,
    handleFormData,
    errors,
  };
};
