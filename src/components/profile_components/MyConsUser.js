import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import green_logo from "../../assets/green_logo.svg";
import DataTable from "react-data-table-component";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

function MyConsUser() {
  let { id } = useParams();
  let { userId } = useParams();

  const [makal, setMakal] = useState([]);
  const [makalInfo, setMakalInfo] = useState({
    cons_name: "",
    cons_subject: "",
    cons_mos: "",
    cons_asar: "",
    cons_phone: "",
    cons_message: "",
    cons_comment: "_",
    cons_time: "",
    cons_seen: "false",
  });
  const [user, setUser] = useState();
  const [thisUser, setThisUser] = useState({});
  const [hasAsar, setHasAsar] = useState(false);
  const [comm, setComm] = useState();
  const [isComm, setIsComm] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [togglableAsars, setTogglableAsars] = useState([]);
  const [asar, setAsar] = useState([]);

  const fetchComm = async () => {
    try {
      let userId = id;
      let isComm = localStorage.getItem("comm_file");

      if (!isComm) {
        try {
          const responseUser = await axios.get(
            `https://jellyfish-app-ew84k.ondigitalocean.app/api/users/${userId}`
          );
          userId = responseUser.data.comm_id;
          setIsComm(false);
          console.log("comm_user");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        try {
          const responseComm = await axios.get(
            `https://jellyfish-app-ew84k.ondigitalocean.app/api/comm/${userId}`
          );
          userId = responseComm.data.comm_id;
          setIsComm(true);
          console.log("NOT COMM");
        } catch (error) {
          console.error("Error fetching comm data:", error);
        }
      }

      try {
        const responseComm = await axios.get(
          `https://jellyfish-app-ew84k.ondigitalocean.app/api/comm/${userId}`
        );
        console.log(userId);
        setComm(responseComm.data);

        if (responseComm.data.comm_asar) {
          try {
            const promises = responseComm.data.comm_asar.map((id) =>
              axios.get(
                `https://jellyfish-app-ew84k.ondigitalocean.app/api/asar/${id}`
              )
            );
            const responses = await Promise.all(promises);

            const asarData = responses
              .filter(
                (response) => response.data && "project_natiga" in response.data
              )
              .map((response) => response.data);

            console.log(asarData);
            setAsar(asarData);
            console.log("Data received for all IDs:", asarData);
            setHasAsar(true);
          } catch (error) {
            console.error("Error fetching asar data:", error);
          }
        } else {
          setHasAsar(false);
        }
        console.log(responseComm);
      } catch (error) {
        console.error("Error fetching comm data:", error);
      }
    } catch (error) {
      console.error("Error in fetchComm:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `https://jellyfish-app-ew84k.ondigitalocean.app/api/users/`
      );
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error while fetching:", error);
    }
  };
  const fetchThisUser = async () => {
    try {
      const responseUser = await axios.get(
        `https://jellyfish-app-ew84k.ondigitalocean.app/api/users/${id}`
      );
      setThisUser(responseUser.data);

      if (responseUser.data.toggable_asars) {
        try {
          const promises = responseUser.data.toggable_asars.map((id) =>
            axios.get(
              `https://jellyfish-app-ew84k.ondigitalocean.app/api/asar/${id}`
            )
          );
          const responses = await Promise.all(promises);

          const asarData = responses
            .filter(
              (response) => response.data && "project_natiga" in response.data
            )
            .map((response) => response.data);

          console.log(asarData);
          setTogglableAsars(asarData);
          console.log("Data received for all IDs:", asarData);
          setHasAsar(true);
        } catch (error) {
          console.error("Error fetching asar data:", error);
        }
      } else {
        setHasAsar(false);
      }

      console.log(responseUser.data);
      try {
        console.log(responseUser.data.name);
        const response = await axios.get(
          `https://jellyfish-app-ew84k.ondigitalocean.app/api/cons`
        );
        setMakal(
          response.data.filter(
            (item) => item.cons_name === responseUser.data.name
          )
        );
        console.log(
          response.data.filter(
            (item) => item.cons_name === responseUser.data.name
          )
        );
      } catch (error) {
        console.error("Error while fetching:", error);
      }
    } catch (error) {
      console.error("Error while fetching:", error);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const inputElements = document.querySelectorAll("input");

      const response = await axios.post(
        `https://jellyfish-app-ew84k.ondigitalocean.app/api/cons`,
        makalInfo
      );
      fetchUser();
      fetchThisUser();
      toast.success("تم ارسال استشارتك بنجاح");
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
    setMakalInfo((prevState) => ({
      ...prevState,
      cons_name: thisUser.name,
      cons_phone: thisUser.email,
    }));
    console.log(makalInfo);
  };
  useEffect(() => {
    fetchComm();
    fetchUser();
    fetchThisUser();
  }, [id]);

  const columns = [
    {
      name: "معاينة",
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
        </div>
      ),
    },
    {
      name: "الموعد المطلوب",
      selector: (row) => row.cons_time,
    },
    {
      name: "عنوان",
      selector: (row) => (
        <a
          data-tooltip-id="my-tooltip"
          data-tooltip-content={row.cons_message}
          data-tooltip-place="top"
        >
          {row.cons_subject}
        </a>
      ),
    },
    {
      name: "حالة الاستشارة",
      selector: (row) => (
        <>
          {row.cons_seen == "true" ? (
            <p className="con_state">تم الرد</p>
          ) : row.cons_seen === "refused" ? (
            <p className="con_state red">تم الرفض</p>
          ) : (
            <p className="con_state orange">انتظر الرد</p>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      {thisUser && user && makal && thisUser && (asar || togglableAsars) ? (
        <div className="card_container_admin">
          <div className="table_con">
            <form className="sign_form" onSubmit={handlePost}>
              <div className="sign_header">
                <h1 className="sign_title">استشارة جديد</h1>
                <img className="sign_logo" src={green_logo} alt="Logo" />
              </div>
              <div className="sign_form_con">
                <div className="sign_element">
                  <label className="sign_label">اختر مستشار</label>
                  <select
                    name="cons_mos"
                    value={makal.cons_mos}
                    onChange={handleChange}
                    className="sign_input"
                  >
                    <option value=""></option>
                    {user
                      .filter((user) => user.isMos === true)
                      .map((user) => (
                        <option key={user.name} value={user.name}>
                          {user.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="sign_element">
                  <label className="sign_label">اختر قياس الأثر</label>
                  <select
                    name="cons_asar"
                    value={makal.cons_asar}
                    onChange={handleChange}
                    className="sign_input"
                  >
                    <option value=""></option>
                    {isComm ? (
                      <>
                        {" "}
                        {asar.map((asar) => (
                          <option
                            key={asar.project_info.projectName}
                            value={asar._id}
                          >
                            {asar.project_info.projectName}
                          </option>
                        ))}
                      </>
                    ) : (
                      <>
                        {" "}
                        {togglableAsars.map((asar) => (
                          <option
                            key={asar.project_info.projectName}
                            value={asar._id}
                          >
                            {asar.project_info.projectName}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>

                <div className="sign_element">
                  <label className="sign_label">
                    الموعد المقترح لرد الاستشارة
                  </label>
                  <input
                    type="date"
                    value={makal.cons_time}
                    name="cons_time"
                    onChange={handleChange}
                    className="sign_input"
                  ></input>
                </div>
                <div className="sign_element">
                  <label className="sign_label">عنوان الاستشارة</label>
                  <input
                    name="cons_subject"
                    value={makal.cons_subject}
                    onChange={handleChange}
                    className="sign_input"
                  ></input>
                </div>
                <div className="sign_element">
                  <label className="sign_label">تفصيل الاستشارة</label>
                  <textarea
                    name="cons_message"
                    value={makal.cons_message}
                    onChange={handleChange}
                    className="sign_input"
                  ></textarea>
                </div>
              </div>
              <input className="submit_btn" type="submit" value="أرسل" />
            </form>
          </div>
          <div className="table_con">
            <h1>الاستشارات المرسلة</h1>
            <DataTable columns={columns} data={makal} />
          </div>
          <Tooltip id="my-tooltip" place="top" />
          <ToastContainer />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default MyConsUser;
