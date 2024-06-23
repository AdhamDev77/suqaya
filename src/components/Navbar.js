import { useState } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import green_logo from "../assets/green_logo.svg";
import "./styles/Navbar.css";

function Navbar() {
  const id = localStorage.getItem("_id")
  const navigate = useNavigate();
  const admin_admin = localStorage.getItem("admin_admin");
  const accessToken = localStorage.getItem("accessToken");
  const comm_file = localStorage.getItem("comm_file");

  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="nav">
      <div className="nav_con">
      <a href="/">
        <img src={green_logo} />
      </a>
        <ul>
          {admin_admin ? (
            <li>
              <button onClick={handleLogout} className="logout_btn">
                خروج <i class="fa-solid fa-right-to-bracket"></i>
              </button>
            </li>
          ) : (
            <>
              {accessToken ? (
                <>
                  {comm_file ? (
                    <li>
                      <Link to={`/comm/profile/${id}`}>حسابنا</Link>
                    </li>
                  ) : (
                    <li>
                      <Link to={`/profile/${id}`}>حسابي</Link>
                    </li>
                  )}
                  <li>
                    <Link to="/makalat">مكتبة أعمق</Link>
                  </li>
                  <li>
                    <Link to="/">عيادة أعمق</Link>
                  </li>
                  <li>
                    <Link to="/">استشارات أعمق</Link>
                  </li>
                  <li>
                    <Link to="/cons">عن المجلس</Link>
                  </li>
                  <li>
              <button onClick={handleLogout} className="logout_btn">
                خروج <i class="fa-solid fa-right-to-bracket"></i>
              </button>
            </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/">الرئيسية</Link>
                  </li>
                  <li>
                    <Link to="/makalat">مكتبة أعمق</Link>
                  </li>
                  <li>
                    <Link to="/">عيادة أعمق</Link>
                  </li>
                  <li>
                  <Link to="/">استشارات أعمق</Link>
                  </li>
                  <li>
                    <Link to="/">عن المجلس</Link>
                  </li>
                  <li>
                    <Link to="/login">
                      تسجيل دخول <i class="fa-solid fa-right-to-bracket"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/sign">
                      حساب جديد <i class="fa-solid fa-user-plus"></i>
                    </Link>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
