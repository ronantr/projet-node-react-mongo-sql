import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { getUserById, getUserByIdRoute } from "../../utils/ApiRoutes";
import { AuthContext } from "../../context/Auth";
import CustomAvatar from "../../components/avatar/CustomAvatar";
import { useParams } from "react-router-dom";

export default function Profile() {
  const userId = useParams().id;
  const {token} = useContext(AuthContext);
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(userId);
    setIsLoading(true);
    const getUserById = async (userId) => {
        await axios.get(`${getUserByIdRoute}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(res => {
          setUser(res.data);
          console.log(res.data);
        })
      }
    getUserById(userId);
    setIsLoading(false);
  }, [userId, token]);

  return (
    <>

     {user !== undefined &&  
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="../assets/post/3.jpeg"
                alt=""
              />
              {/* <CustomAvatar name={user.username} style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                position: "absolute",
                left: "0",
                right: "0",
                margin: "auto",
                top: "150px",
                border: "3px solid #fff",
              }}/> */}
              <img
                className="profileUserImg"
                src="../assets/person/7.jpeg"
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.lastname} {user.firstname}</h4>
                {/* <span className="profileInfoDesc">Hello my friends!</span> */}
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile/>
          </div>
        </div>
      </div>
      }
    </>
  );
}