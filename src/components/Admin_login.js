import "./styles/Sign.css";
import green_logo from "../assets/green_logo.svg";
import sign_img from "../assets/sign_img.jpg";
import sign_image_comm from "../assets/sign_image_comm.svg";
import { useState } from "react";
import { Link ,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

function Login() {
  const navigate = useNavigate();
    const [formType, setFormType] = useState('single');

    const [userInfo, setUserInfo] = useState({username: "", password: ""});

    const handleUserChange = (e) => {
      const { name, value } = e.target;
      setUserInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      console.log(userInfo)
    };
  const handleUserPost = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://suqaya-backend.onrender.com/api/admin/', userInfo)
      console.log('Post successful:', response.data)
      localStorage.setItem("admin_admin", true)
      navigate("/admin/651282101")
      
  } catch (error) {
      console.error('Error while posting:', error.response.data.error);
      toast.error(error.response.data.error)
  }
  };

    
    return (
        <div className='sign_body'>
            <div className='sign_con show admin_sign' id="single">
                <form className='sign_form no_min_height' onSubmit={handleUserPost}>
                    <div className='sign_header'>
                        <h1 className='sign_title'>تسجيل دخول الأدمن</h1>
                        <img className='sign_logo' src={green_logo} alt="Logo" />
                    </div>
                    <div className='sign_form_con'>
                        <div className="sign_element">
                            <label className="sign_label">اسم المستخدم</label>
                            <input name="username" onChange={handleUserChange} className="sign_input"></input>
                        </div>
                  <div className="sign_element">
                            <label className="sign_label">كلمة المرور</label>
                            <input type="password" name="password" onChange={handleUserChange} className="sign_input"></input>
                        </div>
                    </div>
                    <input className="submit_btn" type="submit" value="تسجيل" />
                </form>
                <div >
                        </div>
                
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
