import { Button } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Auth";
import { getFriendStatusRoute } from "../../utils/ApiRoutes";
import "./closeFriend.css";

export default function User({person}) {
  const { isLoading, token, user } = useContext(AuthContext);

  const [friendStatus, setFriendStatus] = useState(null);
  
    const getFriendStatus = async () => {
      console.log(token)
        try {
          const res = await axios.post(getFriendStatusRoute, {
            currentUser: user._id,
            user: user._id,
          }, {
            headers: {
              Authorization: `token ${token}`,
            },
          });
          console.log(res.data);
          setFriendStatus(res.data.friendStatus);
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
        if (token) {
          getFriendStatus();
        }
      }, []);
      
  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={user.profilePicture} alt="" />
      <span className="sidebarFriendName">{user.username}</span>

      {friendStatus === null && <Button>Add Friend</Button>}
      {friendStatus === "requested" && <Button>Pending</Button>}
      {friendStatus === "Friends" && <Button>Friends</Button>}
    </li>

  );
}