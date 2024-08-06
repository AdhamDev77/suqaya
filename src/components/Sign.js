import "./styles/Sign.css";
import green_logo from "../assets/green_logo.svg";
import sign_img from "../assets/sign_img.svg";
import sign_image_comm from "../assets/sign_image_comm.svg";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
function Sign() {
  const navigate = useNavigate();
  const [comms, setComms] = useState([]);
  const [passwordConfirmUser, setPasswordConfirmUser] = useState("");
  const [passwordConfirmComm, setPasswordConfirmComm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://jellyfish-app-ew84k.ondigitalocean.app/api/comm/");
        console.log("Get successful:", response.data);
        setComms(response.data);
      } catch (error) {
        console.error("Error while posting:", error);
      }
    };
    fetchData();
  }, []);

  const [formType, setFormType] = useState("single");

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    gender: "",
    comm_id: "",
    isMos: false,
    isMosReq: false,
  });
  const [commInfo, setCommInfo] = useState({
    comm_name: "",
    comm_email: "",
    comm_password: "",
    comm_file: "",
    comm_dob: "",
  });

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(userInfo);
  };

  const handleCommChange = (e) => {
    const { name, value } = e.target;
    setCommInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(commInfo);
  };

  const handleUserPost = async (e) => {
    e.preventDefault();
    if (userInfo.password !== passwordConfirmUser) {
      toast.error("كرر كلمة المرور بشكل صحيح");
      return;
    }
    if (userInfo.password.length < 8) {
      toast.error("يجب ان تكون كلمة المرور 8 حروف على الأقل");
      return;
    }
    if (userInfo.password.length > 22) {
      toast.error("يجب ان تكون كلمة المرور أقل من 22 حرف");
      return;
    }
    try {
      const response = await axios.post(
        "https://jellyfish-app-ew84k.ondigitalocean.app/api/users/signup",
        userInfo
      );
      console.log("Post successful:", response.data);
      if(userInfo.comm_id !== ""){
        navigate("/user/wait");
      }else{
        navigate(`profile/${response.data._id}`);
      }
    } catch (error) {
      console.error("Error while posting:", error);
      toast.error(error.response.data.error)
    }
  };
  const handleCommPost = async (e) => {
    e.preventDefault();
    if (commInfo.comm_password !== passwordConfirmComm) {
      toast.error("كرر كلمة المرور بشكل صحيح");
      return;
    }
    if (commInfo.comm_password.length < 8) {
      toast.error("يجب ان تكون كلمة المرور 8 حروف على الأقل");
      return;
    }
    if (commInfo.comm_password.length > 22) {
      toast.error("يجب ان تكون كلمة المرور أقل من 22 حرف");
      return;
    }
    console.log(commInfo);
    try {
      const response = await axios.post(
        "https://jellyfish-app-ew84k.ondigitalocean.app/api/comm/signup",
        commInfo
      );

      console.log("Post successful:", response.data);
      navigate("/comm/wait");
    } catch (error) {
      console.error("Error while posting:", error);
      toast.error(error.response.data.error)
    }
  };

  const handleChangeForm = (e) => {
    const single = document.querySelector("#single");
    const comm = document.querySelector("#comm");
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
    <>
      {comms ? (
        <div className="sign_body">
          <div className="sign_con signup_con show" id="single">
            <form onSubmit={handleUserPost} className="sign_form">
              <div className="sign_header">
                <h1 className="sign_title">إنشاء حساب</h1>
                <img className="sign_logo" src={green_logo} alt="Logo" />
              </div>
              <div className="sign_form_con">
                <div className="sign_element_multi">
                  <div
                    className="input_element_inner inner_boolean selected"
                    id="form_1"
                  >
                    <input
                      type="radio"
                      id="yes"
                      value="single"
                      checked={formType === "single"}
                      onChange={handleChangeForm}
                    />
                    <label htmlFor="yes">فرد</label>
                  </div>
                  <div
                    className="input_element_inner inner_boolean"
                    id="form_2"
                  >
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
                <div className="sign_element_multi">
                  <div className="sign_element">
                    <label className="sign_label">اسم</label>
                    <input
                      onChange={handleUserChange}
                      name="name"
                      className="sign_input"
                    ></input>
                  </div>
                  <div className="sign_element">
                    <label className="sign_label">البريد الالكتروني</label>
                    <input
                      onChange={handleUserChange}
                      name="email"
                      className="sign_input"
                    ></input>
                  </div>
                </div>
                <div className="sign_element_multi">
                  <div className="sign_element">
                    <label className="sign_label">رقم الهاتف</label>
                    <input
                      onChange={handleUserChange}
                      name="phone"
                      className="sign_input"
                    ></input>
                  </div>
                  <div className="sign_element">
                    <label className="sign_label">تاريخ الميلاد</label>
                    <input
                      onChange={handleUserChange}
                      name="dob"
                      type="date"
                      className="sign_input"
                    ></input>
                  </div>
                </div>

                <div className="sign_element">
                  <label className="sign_label">اختر المؤسسة</label>
                  <select
                    onChange={handleUserChange}
                    name="comm_id"
                    className="sign_input"
                  >
                    <option value=""></option>
                    {comms.map((comm) => (
                      <option key={comm._id} value={comm._id}>
                        {comm.comm_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sign_element_multi">
                  <div className="sign_element">
                    <label className="sign_label">كلمة المرور</label>
                    <input
                      onChange={handleUserChange}
                      name="password"
                      type="password"
                      className="sign_input"
                    ></input>
                  </div>
                  <div className="sign_element">
                    <label className="sign_label">تأكيد كلمة المرور</label>
                    <input onChange={(e) => setPasswordConfirmUser(e.target.value)} type="password" className="sign_input"></input>
                  </div>
                </div>
                <label className="sign_label">الجنس</label>
                <div className="sign_element_multi">
                  <div className="input_element_inner inner_boolean">
                    <input
                      type="radio"
                      id="yes"
                      value="male"
                      checked={userInfo.gender === "male"}
                      onChange={handleUserChange}
                      name="gender"
                    />
                    <label htmlFor="yes">ذكر</label>
                  </div>
                  <div className="input_element_inner inner_boolean">
                    <input
                      type="radio"
                      id="no"
                      value="female"
                      checked={userInfo.gender === "female"}
                      onChange={handleUserChange}
                      name="gender"
                    />
                    <label htmlFor="no">أنثى</label>
                  </div>
                </div>
              </div>
              <p className="sign_switch">
                هل لديك حساب؟ <Link to="/login">تسجيل دخول</Link>
              </p>
              <input className="submit_btn" type="submit" value="تسجيل" />
            </form>
            {/* <div>
              <img className="sign_vector" src={sign_img} alt="Logo" />
            </div> */}
          </div>
          <div className="sign_con signup_con" id="comm">
            <form onSubmit={handleCommPost} className="sign_form">
              <div className="sign_header">
                <h1 className="sign_title">إنشاء حساب</h1>
                <img className="sign_logo" src={green_logo} alt="Logo" />
              </div>
              <div className="sign_form_con">
                <div className="sign_element_multi">
                  <div
                    className="input_element_inner inner_boolean"
                    id="form_1"
                  >
                    <input
                      type="radio"
                      id="yes"
                      value="single"
                      checked={formType === "single"}
                      onChange={handleChangeForm}
                    />
                    <label htmlFor="yes">فرد</label>
                  </div>
                  <div
                    className="input_element_inner inner_boolean selected"
                    id="form_2_2"
                  >
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
                  <label className="sign_label">اسم المؤسسة</label>
                  <input onChange={handleCommChange}
                      name="comm_name" className="sign_input"></input>
                </div>
                <div className="sign_element">
                  <label className="sign_label">البريد الالكتروني</label>
                  <input onChange={handleCommChange}
                      name="comm_email" className="sign_input"></input>
                </div>
                <div className="sign_element">
                  <label className="sign_label">السجل التجاري (رابط)</label>
                  <input onChange={handleCommChange}
                      name="comm_file" className="sign_input"></input>
                </div>
                <div className="sign_element">
                  <label className="sign_label">تاريخ الإنشاء</label>
                  <input onChange={handleCommChange} type="date"
                      name="comm_dob" className="sign_input"></input>
                </div>
                <div className="sign_element">
                  <label className="sign_label">كلمة المرور</label>
                  <input onChange={handleCommChange}
                      name="comm_password" type="password" className="sign_input"></input>
                </div>
                <div className="sign_element">
                  <label className="sign_label">تأكيد كلمة المرور</label>
                  <input onChange={(e) => setPasswordConfirmComm(e.target.value)} type="password" className="sign_input"></input>
                </div>
              </div>
              <p className="sign_switch">
                هل لديك حساب؟ <Link to="/login">تسجيل دخول</Link>
              </p>
              <input className="submit_btn" type="submit" value="تسجيل" />
            </form>
            {/* <div>
              <img className="sign_vector" src={sign_image_comm} alt="Logo" />
            </div> */}
          </div>
          <ToastContainer />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Sign;
