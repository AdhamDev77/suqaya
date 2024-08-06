import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import kyas_logo_1 from "../../assets/kyas_logo_1.svg";
import kyas_logo_2 from "../../assets/kyas_logo_2.svg";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import "react-tooltip/dist/react-tooltip.css";
import green_logo from "../../assets/green_logo.svg";
import { Tooltip } from "react-tooltip";
import "../styles/viewCons.css";

function MyCons() {
  const [cons, setCons] = useState([]);
  const [user, setUser] = useState({});
  let { id } = useParams();

  const fetchUser = async () => {
    try {
      console.log(id);
      const response = await axios.get(
        `https://jellyfish-app-ew84k.ondigitalocean.app/api/users/${id}`
      );
      console.log("Get successful:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://jellyfish-app-ew84k.ondigitalocean.app/api/cons/"
      );
      console.log("Get successful:", response.data);
      const filteredData = response.data.filter(
        (item) => item.cons_mos === user.name
      );
      setCons(filteredData);
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user.name) {
      fetchData();
    }
  }, [user.name]);

  const handleRefuse = async (id, e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://jellyfish-app-ew84k.ondigitalocean.app/api/cons/${id}`,
        { cons_seen: "refused" }
      );
      fetchData();
    } catch (error) {
      console.error("Error while updating user:", error);
    }
  };

  const columns = [
    {
      name: "اجراءات",
      selector: (row) => (
        <div className="karar">
          <>
            {row.cons_seen === "true" ? (
              <div className="karar_container">
                <a
                  href={`/asar/cons/show/${row._id}`}
                  className="positive_karar"
                >
                  <i className="fa-solid fa-eye"></i>
                </a>
                <p className="karar_text">رؤية</p>
              </div>
            ) : row.cons_seen === "refused" ? (
              <></>
            ) : (
              <div className="karar_container">
                <a href={`/asar/cons/${row._id}`} className="positive_karar">
                  <i class="fa-solid fa-eye"></i>
                </a>
                <p className="karar_text">رؤية</p>
              </div>
            )}
          </>
          <div className="karar_container">
            <button
              onClick={(e) => handleRefuse(row._id, e)}
              className="negative_karar"
            >
              <i class="fa-solid fa-ban"></i>
            </button>
            <p className="karar_text">مسح</p>
          </div>
        </div>
      ),
    },
    {
      name: "حالة الرد",
      selector: (row) => (
        <>
          {row.cons_seen == "true" ? (
            <p className="con_state">تم الرد</p>
          ) : row.cons_seen === "refused" ? (
            <p className="con_state red">تم الرفض</p>
          ) : (
            <p className="con_state orange">منتظر رد</p>
          )}
        </>
      ),
    },
    {
      name: "الموعد المطلوب",
      selector: (row) => row.cons_time,
    },
    {
      name: "البريد الالكتروني",
      selector: (row) => (
        <a
          data-tooltip-id="my-tooltip"
          data-tooltip-content={row.cons_phone}
          data-tooltip-place="top"
        >
          {row.cons_phone}
        </a>
      ),
    },
    {
      name: "الرسالة",
      selector: (row) => (
        <a
          data-tooltip-id="my-tooltip"
          data-tooltip-content={row.cons_message}
          data-tooltip-place="top"
        >
          {row.cons_message}
        </a>
      ),
    },
    {
      name: "عنوان",
      selector: (row) => (
        <a
          data-tooltip-id="my-tooltip"
          data-tooltip-content={row.cons_subject}
          data-tooltip-place="top"
        >
          {row.cons_subject}
        </a>
      ),
    },
    {
      name: "المستشير",
      selector: (row) => row.cons_name,
    },
  ];

  return (
    <>
      {user && cons.length > 0 ? (
        <div className="view_cons">
          <div className="view_cons_container">
            <form className="sign_form">
              <div className="sign_header">
                <h1 className="sign_title">معاينة المستشار</h1>
                <img className="sign_logo" src={green_logo} alt="Logo" />
              </div>
              <div className="sign_form_con">
                <h2 className="show_row">
                  <span className="show_row_title">: الاسم</span>
                  <span className="show_row_content">{user.name}</span>
                </h2>
                <h2 className="show_row">
                  <span className="show_row_title">: البريد الالكتروني</span>
                  <span className="show_row_content">{user.email}</span>
                </h2>
                <h2 className="show_row">
                  <span className="show_row_title">: تاريخ الميلاد</span>
                  <span className="show_row_content">{user.dob}</span>
                </h2>
                <h2 className="show_row">
                  <span className="show_row_title">: رقم الهاتف</span>
                  <span className="show_row_content">{user.name}</span>
                </h2>
                <h2 className="show_row">
                  <span className="show_row_title">: CV</span>
                  <span className="karar show_row_content">
                    <a className="karar positive_karar" href={user.mos_cv}>
                      <i class="fa-solid fa-link"></i>
                    </a>
                  </span>
                </h2>
              </div>
            </form>
            <div className="one_card_container">
              <DataTable columns={columns} data={cons} />
              <Tooltip id="my-tooltip" place="top" />
              <ToastContainer />
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default MyCons;
