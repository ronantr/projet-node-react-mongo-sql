import React, { useContext, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import { AuthContext } from "./context/Auth";
function App() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("fdfsgdfgfdgd");
    console.log("---", token);
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <>
      {!token ? (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      ) : (
        <>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/chat">Chat</Link>
              </li>

              {token && (
                <li>
                  {" "}
                  <button onClick={logout}>logout</button>{" "}
                </li>
              )}
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
