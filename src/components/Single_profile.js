import "./styles/Sign.css";
import { useState, useEffect } from "react";
import axios from "axios";
import User_info from "./profile_components/User_info";
import Change_password from "./profile_components/Change_password";
import Kyas_asar_profile from "./profile_components/Kyas_asar_profile";
import MyCons from "./profile_components/MyCons";
import MyConsUser from "./profile_components/MyConsUser";
import "./styles/SingleProfile.css";
import { useNavigate } from "react-router-dom";

function Single_profile() {
  const navigate = useNavigate();
  const [commName, setCommName] = useState("");
  const [activeTab, setActiveTab] = useState("KyasAsarProfile"); // Default active tab is 'UserInfo'

  const id = localStorage.getItem("_id");
  const isAdmin = localStorage.getItem("admin_admin");
  let isComm = localStorage.getItem("comm_file");
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
        if (!id) {
          navigate("/");
        }
      const response = await axios.get(
        `https://jellyfish-app-ew84k.ondigitalocean.app/api/users/${id}`
      );
      setUser(response.data);
      setCommName(response.data.name);
      console.log(response.data);
    } catch (error) {
      console.error("Error while fetching:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (user.isMos === true) {
      setActiveTab("MyCons");
    } else {
      setActiveTab("KyasAsarProfile");
    }
  }, [user]);

  useEffect(() => {
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");
    const btn4 = document.getElementById("btn4");

    btn1.classList.remove("nav_selected");
    btn2.classList.remove("nav_selected");
    btn3.classList.remove("nav_selected");
    btn4.classList.remove("nav_selected");

    switch (activeTab) {
      case "ChangePassword":
        btn4.classList.add("nav_selected");
        break;
      case "MyCons":
        btn2.classList.add("nav_selected");
        break;
      case "MyConsUser":
        btn2.classList.add("nav_selected");
        break;
      case "KyasAsarProfile": // UserInfo
        btn1.classList.add("nav_selected");
        break;
      case "UserInfo": // UserInfo
        btn3.classList.add("nav_selected");
        break;
      default:
        break;
    }
  }, [activeTab]); // Run this effect whenever activeTab changes

  const renderComponent = () => {
    switch (activeTab) {
      case "ChangePassword":
        return <Change_password />;
      case "MyCons":
        return <MyCons />;
      case "MyConsUser":
        return <MyConsUser />;
      case "KyasAsarProfile":
        return <Kyas_asar_profile />;
      case "UserInfo": // UserInfo
        return <User_info />;
      default:
        return null;
    }
  };

  return (
    <>
      {user ? (
        <div className="profile_body">
          <div className="welcome-message">أهلا بك, {commName}</div>
          <div className="profile_con">
            <div className="profile_nav">
              <button
                id="btn1"
                className="profile_nav_item nav_selected"
                onClick={() => setActiveTab("KyasAsarProfile")}
              >
                قياس الأثر
              </button>
              {user.isMos === true ? (
                <button
                  id="btn2"
                  className="profile_nav_item nav_selected"
                  onClick={() => setActiveTab("MyCons")}
                >
                  استشاراتي
                </button>
              ) : (
                <button
                  id="btn2"
                  className="profile_nav_item nav_selected"
                  onClick={() => setActiveTab("MyConsUser")}
                >
                  استشاراتي
                </button>
              )}
              <button
                id="btn3"
                className="profile_nav_item"
                onClick={() => setActiveTab("UserInfo")}
              >
                معلومات المستخدم
              </button>
              <button
                id="btn4"
                className="profile_nav_item"
                onClick={() => setActiveTab("ChangePassword")}
              >
                تغيير كلمة المرور
              </button>
            </div>
            <div className="profile_card">{renderComponent()}</div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Single_profile;
