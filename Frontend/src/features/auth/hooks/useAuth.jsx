import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { loginUserApi, logoutUserApi, registerUserApi } from "../api/AuthApi";
import { useContext } from "react";
import { MyStore } from "../../../context/authContext";
import { useApi } from "../../../app/api/useApi";

export const useRegisterUser = () => {
  const api = useApi();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const handleFormData = async (data) => {
    try {
      const res = await registerUserApi(api , data);
      toast.success(res.data.message);
      reset({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
      const message = error.response?.data?.message;
      toast.error(message);
    }
  };
  return {
    register,
    handleSubmit,
    reset,
    watch,
    handleFormData,
    navigate,
    errors,
  };
};


export const useLoginUser = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { setUser , setAccessToken } = useContext(MyStore);
  

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
      const res = await loginUserApi(api , data);
      toast.success(res.data.message);
      reset({
        email: "",
        password: "",
      });
      setUser(res.data.data.user);
      setAccessToken(res.data.accessToken);
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
    reset,
    handleFormData,
    navigate,
    errors,
  };
};


export const useLogoutUser = () => {
  const { user , setUser , setAccessToken } = useContext(MyStore);
  const api = useApi();

  const handleLogout = async () => {
    try {
    const res = await logoutUserApi(api);
    toast.success(res.data.message);
    setUser(null);
      setAccessToken(null);
  } catch (error) {
    console.log(error);
      const message = error.response?.data?.message;
      toast.error(message);
  }
  }
  return { user , handleLogout }
}

