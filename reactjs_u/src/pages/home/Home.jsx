import React, { useContext, useEffect, useState } from "react";
// import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Topbar from "../../components/topbar/Topbar";
import "./home.css"
import { AuthContext } from "../../context/Auth";
import axios from "axios";
import { getAllFriendRequestsRoute } from "../../utils/ApiRoutes";
import { Alert, Paper } from "@mui/material";

export default function Home() {

  const { isLoading, token } = useContext(AuthContext);

  const [friendRequests, setFriendRequests] = useState([]);
  
    const getAllFriendRequests = async () => {
        try {
          const res = await axios.get(getAllFriendRequestsRoute, {
            headers: {
              Authorization: `token ${token}`,
            },
          });
          console.log(res.data.requests);
          setFriendRequests(res.data.requests);
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
        if (token) {
          getAllFriendRequests();
        }
      }, []);

  return (

    <>
    {/* <Topbar /> */}
    <div className="homeContainer">

    {friendRequests && friendRequests.length > 0 && 
    friendRequests.map((request) => 
      <Alert className="friendRequest">
        <span className="friendRequestName">{request.username}</span>
        <button className="friendRequestButton">Accept</button>
      </Alert>
  
    )}

      <Sidebar />
      <Feed/>
      <Rightbar/>
    </div>
  </>
  );
}