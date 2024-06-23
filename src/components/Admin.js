import "./styles/Sign.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Users_manage from "./admin_components/Users_manage";
import Comms_manage from "./admin_components/Comms_manage";
import Makalat_manage from "./admin_components/Makalat_manage";
import DataTable from 'react-data-table-component';
import "./styles/SingleProfile.css";

function Single_profile() {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState('CommsManage');
  const admin_admin = localStorage.getItem("admin_admin")

  useEffect(() => {
    // Get references to the buttons
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');

    // Remove all classes
    btn1.classList.remove('nav_selected');
    btn2.classList.remove('nav_selected');
    btn3.classList.remove('nav_selected');

    // Add class to active button
    switch (activeTab) {
      case 'CommsManage':
        btn1.classList.add('nav_selected');
        break;
        case 'UsersManage': // UserInfo
        btn2.classList.add('nav_selected');
        break;
        case 'MakalatManage': // UserInfo
        btn3.classList.add('nav_selected');
        break;
    }
  }, [activeTab]); // Run this effect whenever activeTab changes

  const renderComponent = () => {
    switch (activeTab) {
      case 'UsersManage':
        return <Users_manage />;
      case 'MakalatManage':
        return <Makalat_manage />;
      default: // UserInfo
        return <Comms_manage />;
    }
  };



  return (
    <>
    {admin_admin ? (
      <div className="profile_body">
      <div className="profile_con admin_con">
        <div className="profile_nav">
          <button id="btn1" className="profile_nav_item nav_selected" onClick={() => setActiveTab('CommsManage')}>ادارة المؤسسات</button>
          <button id="btn2" className="profile_nav_item" onClick={() => setActiveTab('UsersManage')}>ادارة المستشارين</button>
          <button id="btn3" className="profile_nav_item" onClick={() => setActiveTab('MakalatManage')}>ادارة المقالات</button>
        </div>
          {renderComponent()}
      </div>
    </div>
    ):(<></>)}
</>
  );
}

export default Single_profile;
