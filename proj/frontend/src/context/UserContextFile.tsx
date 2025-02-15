import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { logout, getMe } from "../api/apiLogin";

interface User {
  role: string;
  fname: string;
  lname: string;
  RestaurantID: number | undefined;
  ChainFoodID: number | undefined;
}

interface UserContextType {
  isAuthenticated: boolean;
  contextLogin: (role: string, fname: string, lname: string, RestaurantID: number | undefined, ChainFoodID: number | undefined) => void;
  contextLogout: () => void;
  user: User | undefined;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getMe();
        contextLogin(
          userData.role,
          userData.fname,
          userData.lname,
          userData.restaurant_id,
          userData.foodchain_id
        );
      } catch (error) {
        console.error("Failed to load user:", error);
        contextLogout();
      }
    };

    loadUser();
  }, []);

  const contextLogin = (
    role: string,
    fname: string,
    lname: string,
    RestaurantID: number | undefined,
    ChainFoodID: number | undefined
  ) => {
    if (role == null){
      setIsAuthenticated(false);
      setUser(undefined);
    }
    else{
      setIsAuthenticated(true);
      setUser({ role, fname, lname, RestaurantID, ChainFoodID });
    }
  };

  const contextLogout = () => {
    logout();
    setIsAuthenticated(false);
    setUser(undefined);
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, contextLogin, contextLogout, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext deve ser usado dentro de um UserProvider");
  }
  return context;
};
