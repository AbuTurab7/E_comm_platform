import { useNavigate } from "react-router";
import { CreateProductAPI } from "../api/CreateProductApi";
import { useApi } from "../../../app/api/useApi";
import { useContext } from "react";
import { MyStore } from "../../../context/authContext";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

export const UseCreateProduct = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { user } = useContext(MyStore);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const handleFormData = async (data) => {
    try {
      if (!user) {
        toast.error("Please login first.");
        return;
      }
      const res = await CreateProductAPI(api, data);
      
      toast.success(res.data.message);
      reset({
        title: "",
        description: "",
        price: "",
        quantity: "",
      });
      navigate("/main/products");
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message;
      toast.error(message);
    }
  };
  return {
    register,
    handleSubmit,
    handleFormData,
    errors,
  };
};
