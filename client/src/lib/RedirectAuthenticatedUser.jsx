import { useAuthStore } from "@/store/authStore";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";


const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RedirectAuthenticatedUser;