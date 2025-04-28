import "./styles/Sign.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Users_manage from "./comm_profile_components/User_manage";
import Admins_manage from "./comm_profile_components/Admins_manage";
import Kyas_asar_profile from "./comm_profile_components/Kyas_asar_profile";
import "./styles/SingleProfile.css";
import { useNavigate, useParams } from "react-router-dom";

function Single_profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [commName, setCommName] = useState("");
  const [activeTab, setActiveTab] = useState("KyasAsarProfile");

  const fetchComm = async () => {
    try {
      const isAdmin = localStorage.getItem("admin_admin");
      let isComm = localStorage.getItem("comm_file");
      
      if (!isAdmin) {
          navigate("/");
      }

      const response = await axios.get(
        `https://suqaya-backend.onrender.com/api/comm/${id}`
      );
      setCommName(response.data.comm_name);
    } catch (error) {
      console.error("Error while fetching:", error);
    }
  };

  useEffect(() => {
    fetchComm();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");

    btn1.classList.remove("nav_selected");
    btn2.classList.remove("nav_selected");
    btn3.classList.remove("nav_selected");

    switch (activeTab) {
      case "UsersManage":
        btn1.classList.add("nav_selected");
        break;
      case "AdminsManage":
        btn2.classList.add("nav_selected");
        break;
      case "KyasAsarProfile":
        btn3.classList.add("nav_selected");
        break;
    }
  }, [activeTab]);

  const renderComponent = () => {
    switch (activeTab) {
      case "UsersManage":
        return <Users_manage local_id={id} />;
      case "AdminsManage":
        return <Admins_manage local_id={id} />;
      case "KyasAsarProfile":
        return <Kyas_asar_profile local_id={id} />;
    }
  };

  return (
    <div className="profile_body">
      <div className="welcome-message">لوحة تحكم ({commName}) <button className="nav_btn" onClick= {(e) => {navigate("/admin/651282101")}} >رجوع <i class="fa-solid fa-arrow-left"></i></button></div>
      
      <div className="profile_con admin_con">
        <div className="profile_nav">
          <button
            id="btn3"
            className="profile_nav_item"
            onClick={() => setActiveTab("KyasAsarProfile")}
          >
            ادارة قياس الأثر
          </button>
          <button
            id="btn1"
            className="profile_nav_item"
            onClick={() => setActiveTab("UsersManage")}
          >
            ادارة الأعضاء
          </button>
          <button
            id="btn2"
            className="profile_nav_item"
            onClick={() => setActiveTab("AdminsManage")}
          >
            ادارة المديرين
          </button>
        </div>
        {renderComponent()}
      </div>
    </div>
  );
}

export default Single_profile;
