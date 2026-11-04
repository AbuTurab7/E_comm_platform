import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthContextProvider } from "./context/authContext";

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
  <AuthContextProvider>
    <AppRoutes />
    <ToastContainer />
  </AuthContextProvider>
   </QueryClientProvider>,
);

