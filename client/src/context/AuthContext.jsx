import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

const usuarioInicial = JSON.parse(localStorage.getItem("userData")) || {};

const AuthContextProvider = ({ children }) => {
  
  const [userData, setUserData] = useState(usuarioInicial);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <AuthContext.Provider value={{ userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
