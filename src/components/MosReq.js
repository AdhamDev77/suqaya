import "./styles/Sign.css";
import green_logo from "../assets/green_logo.svg";
import sign_img from "../assets/sign_img.svg";
import sign_image_comm from "../assets/sign_image_comm.svg";
import { useState } from "react";
import { Link ,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

function MosReq() {
  const navigate = useNavigate();
    const [formType, setFormType] = useState('single');
    const [userInfo, setUserInfo] = useState({cv: "", image: ""});

    const id = localStorage.getItem("_id")

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
      const response = await axios.patch(`https://jellyfish-app-ew84k.ondigitalocean.app/api/users/${id}`, {isMosReq: true, mos_cv: userInfo.cv, mos_image: userInfo.image})
      navigate(-1)
      toast.success("تم ارسال طلب تعيين كمستاشر")
      console.log('Post successful:', response.data)
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
                        <h1 className='sign_title'>طلب التعيين كمستشار</h1>
                        <img className='sign_logo' src={green_logo} alt="Logo" />
                    </div>
                    <div className='sign_form_con'>
                        <div className="sign_element">
                            <label className="sign_label">ملف الخبرات (رابط)</label>
                            <input name="cv" onChange={handleUserChange} className="sign_input"></input>
                        </div>
                  <div className="sign_element">
                            <label className="sign_label">صورة شخصية (رابط)</label>
                            <input name="image" onChange={handleUserChange} className="sign_input"></input>
                        </div>
                    </div>
                    <input className="submit_btn" type="submit" value="ارسال طلب" />
                </form>
                <div >
                        </div>
                
            </div>
            <ToastContainer />
        </div>
    );
}

export default MosReq;
