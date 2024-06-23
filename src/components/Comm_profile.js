import "./styles/Sign.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import Users_manage from "./comm_profile_components/User_manage";
import Admins_manage from "./comm_profile_components/Admins_manage";
import Kyas_asar_profile from "./comm_profile_components/Kyas_asar_profile";
import "./styles/SingleProfile.css";

function Single_profile() {
  const [commName, setCommName] = useState('');
  const [activeTab, setActiveTab] = useState('KyasAsarProfile');

  const fetchComm = async () => {
    try {
      const id = localStorage.getItem("_id");
      const response = await axios.get(`https://jellyfish-app-ew84k.ondigitalocean.app/api/comm/${id}`);
      setCommName(response.data.comm_name);
    } catch (error) {
      console.error("Error while fetching:", error);
    }
  };

  useEffect(() => {
    fetchComm();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');

    btn1.classList.remove('nav_selected');
    btn2.classList.remove('nav_selected');
    btn3.classList.remove('nav_selected');

    switch (activeTab) {
      case 'UsersManage':
        btn1.classList.add('nav_selected');
        break;
      case 'AdminsManage':
        btn2.classList.add('nav_selected');
        break;
      case 'KyasAsarProfile':
        btn3.classList.add('nav_selected');
        break;
    }
  }, [activeTab]);

  const renderComponent = () => {
    switch (activeTab) {
      case 'UsersManage':
        return <Users_manage />;
      case 'AdminsManage':
        return <Admins_manage />;
      case 'KyasAsarProfile':
        return <Kyas_asar_profile />;
    }
  };

  return (
    <div className="profile_body">
     <div className="welcome-message">
      أهلا بك, مدير {commName}
      </div>
      <div className="profile_con admin_con">
        <div className="profile_nav">
          <button id="btn3" className="profile_nav_item" onClick={() => setActiveTab('KyasAsarProfile')}>ادارة قياس الأثر</button>
          <button id="btn1" className="profile_nav_item" onClick={() => setActiveTab('UsersManage')}>ادارة الأعضاء</button>
          <button id="btn2" className="profile_nav_item" onClick={() => setActiveTab('AdminsManage')}>ادارة المديرين</button>
        </div>
        {renderComponent()}
      </div>
    </div>
  );
}

export default Single_profile;
