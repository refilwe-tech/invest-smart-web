import { useEffect, useState } from "react";
import { useAuthStore } from "../store";

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    setIsAuth(isAuth);
    setIsAuthenticated(isAuth)
  }, []);

  const authenticateUser =(state:boolean)=>{
    setIsAuthenticated(state);
    setIsAuth(state)
  }

  return {
    isAuth,
    authenticateUser
  };
};
