import { useState, useEffect } from "react";
import axios from "axios";
import kyas_logo_1 from "../assets/kyas_logo_1.svg";
import kyas_logo_2 from "../assets/kyas_logo_2.svg";
import "./styles/Makal.css";

function Makal() {
  const [makal, setMakal] = useState([]);

  const fetchMakal = async () => {
    try {
      const response = await axios.get(
        `https://suqaya-backend.onrender.com/api/makal`
      );
      console.log(response.data);
      setMakal(response.data);
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMakal();
  }, []);
  return (
    <div className="makal_body">
      <div className="asar_header">
        <img className="kyas_logo_1" src={kyas_logo_1} />
        <img className="kyas_logo_2" src={kyas_logo_2} />
        <div className="asar_header_text">
          <h1 className="asar_title">مكتبة سقاية</h1>
          <p className="asar_title_2">
            مكتبة سقاية تحوي المجلدات و المستندات الازمة لقياس الأثر .. جاري
            العمل عليها انتظرونا
          </p>
        </div>
      </div>
      <div className="makal_con">
        <div className="cards_con">
          {makal.map((item) => (
            <div key={item._id} className="makal_card">
              <div className="makal_img">
                <img src={item.makal_img} />
              </div>
              <div className="makal_info">
                <h2 className="makal_title">{item.makal_title}</h2>
                <h4 className="makal_type">{item.makal_type}</h4>
                <p className="makal_description">{item.makal_description}</p>
              </div>
              <a href={item.makal_link} className="submit_btn">
                <i class="fa-solid fa-download"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Makal;
