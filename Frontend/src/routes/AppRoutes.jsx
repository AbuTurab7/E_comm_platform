import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import RegisterPage from "../features/auth/ui/pages/RegisterPage";
import LoginPage from "../features/auth/ui/pages/LoginPage";
import Products from "../features/products/ui/pages/Products";
import ProductDet from "../features/productDetails/ui/pages/ProductDet";
import AuthProtected from "./AuthProtected";
import AuthLayout from "../app/layout/AuthLayout";
import MainLayout from "../app/layout/MainLayout";
import CreateProductPage from "../features/createProduct/ui/pages/CreateProductPage";
import UpdateProductPage from "../features/updateProduct/ui/pages/UpdateProductPage";

function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <AuthProtected />,
      children: [
        {
          element: <AuthLayout />,
          children: [
            {
              index: true,
              loader: () => redirect("/auth/login"),
            },
            {
              path: "/auth/register",
              element: <RegisterPage />,
            },
            {
              path: "/auth/login",
              element: <LoginPage />,
            },
          ],
        },
      ],
    },
    {
      path: "/",
      loader: () => redirect("/main"),
    },
    {
      path: "/main",
      element: <MainLayout />,
      children: [
        {
          index: true,
          loader: () => redirect("/main/products"),
        },
        {
          path: "/main/products",
          element: <Products />,
        },
        {
          path: "/main/products/:id",
          element: <ProductDet />,
        },
        {
          path: "/main/product/create",
          element: <CreateProductPage/>
        },
        {
          path: "/main/product/update/:id",
          element: <UpdateProductPage/>
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default AppRoutes;
