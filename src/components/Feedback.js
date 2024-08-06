import "./styles/Sign.css";
import green_logo from "../assets/green_logo.svg";
import help_img from "../assets/help_img.svg";
import { useState, useEffect } from "react";
function Feedback() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  const [formType, setFormType] = useState("single");

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
    <div className="sign_body">
      <div className="sign_con show" id="single">
        <form className="sign_form">
          <div className="sign_form_con">
            <div className="sign_element_multi">
              <div className="sign_element">
                <input className="sign_input" placeholder="الاسم"></input>
              </div>
              <div className="sign_element">
                <input
                  className="sign_input"
                  placeholder="البريد الالكتروني"
                ></input>
              </div>
            </div>
            <div className="sign_element">
              <input className="sign_input" placeholder="موضوع الرسالة"></input>
            </div>
            <div className="sign_element">
              <textarea
                className="sign_input"
                placeholder="أكتب رسالتك هنا ..."
              ></textarea>
            </div>
          </div>
          <input className="submit_btn" type="submit" value="أرسل" />
        </form>
        <div>
          <img className="sign_vector" src={help_img} alt="Logo" />
        </div>
      </div>
    </div>
  );
}

export default Feedback;
