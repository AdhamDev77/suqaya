import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import green_logo from "../assets/green_logo.svg";
import "./styles/Navbar.css";

function Navbar() {
  const id = localStorage.getItem("_id");
  const navigate = useNavigate();
  const admin_admin = localStorage.getItem("admin_admin");
  const accessToken = localStorage.getItem("accessToken");
  const comm_file = localStorage.getItem("comm_file");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

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
          <img src={green_logo} alt="Logo" />
        </a>
        <ul className={`nav_links ${isMenuOpen ? 'active' : ''}`}>
          {admin_admin ? (
            <li>
              <button onClick={(e) => { handleLogout(e); closeMenu(); }} className="logout_btn">
                خروج <i className="fa-solid fa-right-to-bracket"></i>
              </button>
            </li>
          ) : (
            <>
              {accessToken ? (
                <>
                  {comm_file ? (
                    <li>
                      <Link to={`/comm/profile/${id}`} onClick={closeMenu}>حسابنا</Link>
                    </li>
                  ) : (
                    <li>
                      <Link to={`/profile/${id}`} onClick={closeMenu}>حسابي</Link>
                    </li>
                  )}
                  <li>
                    <Link to="/makalat" onClick={closeMenu}>مكتبة أعمق</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={closeMenu}>عيادة أعمق</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={closeMenu}>استشارات أعمق</Link>
                  </li>
                  <li>
                    <Link to="/cons" onClick={closeMenu}>عن المجلس</Link>
                  </li>
                  <li>
                    <button onClick={(e) => { handleLogout(e); closeMenu(); }} className="logout_btn">
                      خروج <i className="fa-solid fa-right-to-bracket"></i>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/" onClick={closeMenu}>الرئيسية</Link>
                  </li>
                  <li>
                    <Link to="/makalat" onClick={closeMenu}>مكتبة أعمق</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={closeMenu}>عيادة أعمق</Link>
                  </li>
                  <li>
                    <Link to="/feedback" onClick={closeMenu}>استشارات أعمق</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={closeMenu}>عن المجلس</Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={closeMenu}>
                      تسجيل دخول <i className="fa-solid fa-right-to-bracket"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="/sign" onClick={closeMenu}>
                      حساب جديد <i className="fa-solid fa-user-plus"></i>
                    </Link>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
        <button className={`burger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
