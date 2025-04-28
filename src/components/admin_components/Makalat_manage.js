import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import green_logo from "../../assets/green_logo.svg";
import no_kyas from "../../assets/no_kyas.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function Makalat_manage() {
  const [makal, setMakal] = useState([]);
  const [makalInfo, setMakalInfo] = useState({
    makal_title: "",
    makal_description: "",
    makal_type: "",
    makal_link: "",
    makal_img: "",
  });

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
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const inputElements = document.querySelectorAll("input");
      const response = await axios.post(
        `https://suqaya-backend.onrender.com/api/makal`,
        makalInfo
      );
      setMakalInfo({
        makal_title: "",
        makal_description: "",
        makal_type: "",
        makal_link: "",
        makal_img: "",
      });
      inputElements.forEach((input) => {
        if (
          input.type === "text" ||
          input.type === "password" ||
          input.type === "email"
        ) {
          input.value = ""; // Clear the input value
        } else if (input.type === "checkbox" || input.type === "radio") {
          input.checked = false; // Uncheck checkboxes and radio buttons
        } else if (input.type === "file") {
          input.value = null; // Clear file input value
        } else if (
          input.type === "select" ||
          input.type === "select-multiple"
        ) {
          input.selectedIndex = -1; // Reset select input to its default state
        }
      });
      fetchMakal();
    } catch (error) {
      console.error("Error while posting:", error);
      toast.error(error.response.data.error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMakalInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(makalInfo);
  };
  useEffect(() => {
    fetchMakal();
  }, []);
  const handleRemove = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://suqaya-backend.onrender.com/api/makal/${id}`
      );
      console.log("Deleted successful:", response.data);
      fetchMakal();
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  const columns = [
    {
      name: "اجراءات",
      selector: (row) => (
        <div className="karar">
          <button
            onClick={(e) => handleRemove(e, row._id)}
            className="negative_karar"
          >
            <i class="fa-solid fa-x"></i>
          </button>
        </div>
      ),
    },
    {
      name: "رابط المقال",
      selector: (row) => <a href={row.makal_link}>الرابط</a>,
    },
    {
      name: "نوع المقال",
      selector: (row) => row.makal_type || row.makal_category,
    },
    {
      name: "اسم المقال",
      selector: (row) => row.makal_name || row.makal_title,
    },
  ];

  return (
    <>
      {makal ? (
        <div className="card_container_admin">
          <div className="table_con">
            <form className="sign_form" onSubmit={handlePost}>
              <div className="sign_header">
                <h1 className="sign_title">مقال جديد</h1>
                <img className="sign_logo" src={green_logo} alt="Logo" />
              </div>
              <div className="sign_form_con">
                <div className="sign_element">
                  <label className="sign_label">عنوان المقال</label>
                  <input
                    name="makal_title"
                    onChange={handleChange}
                    className="sign_input"
                  ></input>
                </div>
                <div className="sign_element">
                  <label className="sign_label">نوع</label>
                  <input
                    name="makal_type"
                    onChange={handleChange}
                    className="sign_input"
                  ></input>
                </div>
                <div className="sign_element">
                  <label className="sign_label">الوصف</label>
                  <input
                    name="makal_description"
                    onChange={handleChange}
                    className="sign_input"
                  ></input>
                </div>
                <div className="sign_element">
                  <label className="sign_label">رابط المحتوى</label>
                  <input
                    name="makal_link"
                    onChange={handleChange}
                    className="sign_input"
                  ></input>
                </div>
                <div className="sign_element">
                  <label className="sign_label">رابط الصورة</label>
                  <input
                    name="makal_img"
                    onChange={handleChange}
                    className="sign_input"
                  ></input>
                </div>
              </div>
              <input className="submit_btn" type="submit" value="إنشاء مقال" />
            </form>
          </div>
          <div className="table_con">
            <h1>المقالات المعروضة</h1>
            <DataTable columns={columns} data={makal} />
          </div>
          <ToastContainer />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Makalat_manage;
