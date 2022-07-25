import "./topbar.css";
import React, { useContext } from "react";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { AuthContext } from "../../context/Auth";
import MyNotifications from "./MyNotifications";

export default function Topbar() {
  const {user} = useContext(AuthContext);
  
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">Mon GES</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
          <MyNotifications />
          </div>
        </div>
        <img src="/assets/person/1.jpeg" alt="" className="topbarImg"/>
        <span>{user?.username}</span>
      </div>
    </div>
  );
}

