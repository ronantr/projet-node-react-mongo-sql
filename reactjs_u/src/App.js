import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Chat from "./pages/Chat";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Topbar/>
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
    </BrowserRouter>

  );
}

export default App;
