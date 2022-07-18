import React, { useState, createContext } from "react";
import { loginRoute } from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(null);

const AuthProvider = (props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = (username, password) => {
    if (!token) {
      setIsLoading(true);
      setError(null);
      loginRequest(username, password);
    }
    navigate("/");
  };

  const logout = () => {
    setError(null);
    setUser(null);
    setIsLoading(false);
  };

  const loginRequest = async (username, password) => {
    const data = await fetch(loginRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const response = await data.json();
    console.log(data);
    if (data.status === 200) {
      // console.log(response);
      localStorage.setItem("app-user", JSON.stringify(response.user));
      localStorage.setItem(
        "app-user-token",
        JSON.stringify({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        })
      );
      setUser(response.user);
      setToken(response.accessToken);
      navigate("/");
    } else {
      setError(response.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        token,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
