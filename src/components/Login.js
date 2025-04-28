import "./styles/Sign.css";
import green_logo from "../assets/green_logo.svg";
import sign_img from "../assets/sign_img.jpg";
import sign_image_comm from "../assets/sign_img_comm_2.jpg";
import { useState, useEffect } from "react";
import { Link ,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
    const [formType, setFormType] = useState('single');

    const [userInfo, setUserInfo] = useState({email: "", password: ""});
    const [commInfo, setCommInfo] = useState({comm_email: "", comm_email: ""});

    const handleUserChange = (e) => {
      const { name, value } = e.target;
      setUserInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      console.log(userInfo)
    };

    const handleCommChange = (e) => {
      const { name, value } = e.target;
      setCommInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      console.log(commInfo)
    };

  const handleUserPost = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://suqaya-backend.onrender.com/api/users/login', userInfo)
      console.log('Post successful:', response.data)
      localStorage.setItem("_id", response.data.user._id)
      localStorage.setItem("accessToken", response.data.token)
      navigate(`/profile/${response.data.user._id}`)
      
  } catch (error) {
      console.error('Error while posting:', error.response.data.error);
      toast.error(error.response.data.error)
  }
  };
  const handleCommPost = async (e) => {
    e.preventDefault()
    console.log(commInfo)
    try {
      const response = await axios.post('https://suqaya-backend.onrender.com/api/comm/login', commInfo)
      
      console.log('Post successful:', response.data)
      localStorage.setItem("_id", response.data.comm._id)
      localStorage.setItem("accessToken", response.data.token)
      localStorage.setItem("comm_file", response.data.comm.comm_file)
      navigate(`/comm/profile/${response.data.comm._id}`)
      
  } catch (error) {
      console.error('Error while posting:', error);
      toast.error(error.response.data.error)
  }
  };

const handleChangeForm = (e) => {
    const single = document.querySelector("#single")
    const comm = document.querySelector("#comm")
    const { value } = e.target;
    setFormType(value);
    if (value === "single") {
        single.classList.add("show");
        comm.classList.remove("show");
    } else {
        single.classList.remove("show");
        comm.classList.add("show");
    }
};

    
    return (
        <div className='sign_body'>
            <div className='sign_con show' id="single">
                <form className='sign_form' onSubmit={handleUserPost}>
                    <div className='sign_header'>
                        <h1 className='sign_title'>تسجيل دخول</h1>
                        <img className='sign_logo' src={green_logo} alt="Logo" />
                    </div>
                    <div className='sign_form_con'>
                    <div className="sign_element_multi">
                    <div className="input_element_inner inner_boolean selected" id="form_1">
                      <input
                        type="radio"
                        id="yes"
                        value="single"
                        checked={formType === "single"}
                        onChange={handleChangeForm}
                      />
                      <label htmlFor="yes">فرد</label>
                    </div>
                    <div className="input_element_inner inner_boolean" id="form_2">
                      <input
                        type="radio"
                        id="no"
                        value="comm"
                        checked={formType === "comm"}
                        onChange={handleChangeForm}
                      />
                      <label htmlFor="no">مؤسسة</label>
                    </div>
                  </div>
                        <div className="sign_element">
                            <label className="sign_label">البريد الالكتروني</label>
                            <input name="email" onChange={handleUserChange} className="sign_input"></input>
                        </div>
                  <div className="sign_element">
                            <label className="sign_label">كلمة المرور</label>
                            <input type="password" name="password" onChange={handleUserChange} className="sign_input"></input>
                        </div>
                    </div>
                    <p className="sign_switch"> ليس لديك حساب؟ <Link to="/sign">إنشاء حساب</Link></p>
                    <input className="submit_btn" type="submit" value="تسجيل" />
                </form>
                <div className="sign_vector_holder" style={{ backgroundImage: `url(${sign_img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
</div>

                
            </div>
            <div className='sign_con' id="comm">
                <form onSubmit={handleCommPost} className='sign_form'>
                    <div className='sign_header'>
                        <h1 className='sign_title'>تسجيل دخول</h1>
                        <img className='sign_logo' src={green_logo} alt="Logo" />
                    </div>
                    <div className='sign_form_con'>
                    <div className="sign_element_multi">
                    <div className="input_element_inner inner_boolean" id="form_1">
                      <input
                        type="radio"
                        id="yes"
                        value="single"
                        checked={formType === "single"}
                        onChange={handleChangeForm}
                      />
                      <label htmlFor="yes">فرد</label>
                    </div>
                    <div className="input_element_inner inner_boolean selected" id="form_2">
                      <input
                        type="radio"
                        id="no"
                        value="comm"
                        checked={formType === "comm"}
                        onChange={handleChangeForm}
                      />
                      <label htmlFor="no">مؤسسة</label>
                    </div>
                  </div>
                        <div className="sign_element">
                            <label className="sign_label">البريد الالكتروني</label>
                            <input onChange={handleCommChange} name="comm_email" className="sign_input"></input>
                        </div>
                        <div className="sign_element">
                            <label className="sign_label">كلمة المرور</label>
                            <input onChange={handleCommChange} type="password" name="comm_password" className="sign_input"></input>
                        </div>
                    </div>
                    <p className="sign_switch"> ليس لديك حساب؟ <Link to="/sign">إنشاء حساب</Link></p>
                    <input className="submit_btn" type="submit" value="تسجيل" />
                </form>
                <div className="sign_vector_holder" style={{ backgroundImage: `url(${sign_image_comm})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
</div>

                
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
