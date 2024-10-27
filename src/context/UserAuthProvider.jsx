import { createContext, useContext, useState } from "react";

const userAuth = createContext({
  token: null,
});

// eslint-disable-next-line react/prop-types
const UserAuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <userAuth.Provider value={{ token, setToken }}>
      {children}
    </userAuth.Provider>
  );
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const userAuthContext = () => useContext(userAuth);

export default UserAuthProvider;
