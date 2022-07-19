import React, { useState, createContext, useEffect } from "react";
import { loginRoute } from "../utils/ApiRoutes";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(null);

const AuthProvider = (props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("app-user")) || null
  );
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("app-user-token")) || null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    console.log(token);
    if (!token) {
      setIsLoading(true);
      setError(null);
      await loginRequest(username, password);
      setIsLoading(false);
    }
    navigate("/");
  };

  const logout = () => {
    console.log("logout");
    setError(null);
    setUser(null);
    localStorage.removeItem("app-user-token");
    localStorage.removeItem("app-user");
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

  // useEffect(() => {
  //   const user = localStorage.getItem("app-user");
  //   const token = localStorage.getItem("app-user-token");
  //   if (user && token) {
  //     setUser(JSON.parse(user));
  //     setToken(JSON.parse(token).accessToken);
  //   }
  // }, []);
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