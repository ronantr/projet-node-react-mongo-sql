import { Avatar } from "@mui/material";
import CustomAvatar from "../avatar/CustomAvatar";
import "./closeFriend.css";
export default function CloseFriend({user}) {
  return (
    <li className="sidebarFriend">
      <CustomAvatar name={user.username} />
      {/* <img className="sidebarFriendImg" src={user.profilePicture} alt="" /> */}
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}