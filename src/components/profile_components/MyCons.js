import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

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
      console.error("Error while fetching user:", error);
    }
  };

  const fetchData = async (userName) => {
    try {
      const response = await axios.get(
        "https://jellyfish-app-ew84k.ondigitalocean.app/api/cons/"
      );
      console.log("Get successful:", response.data);
      const filteredData = response.data.filter(
        (item) => item.cons_mos === userName
      );
      console.log("Result :", filteredData);
      setCons(filteredData);
    } catch (error) {
      console.error("Error while fetching cons:", error);
    }
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchUser();
    };

    fetchDataAsync();
  }, [id]);

  useEffect(() => {
    if (user.name) {
      fetchData(user.name);
    }
  }, [user]);

  const handleRefuse = async (id, e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `https://jellyfish-app-ew84k.ondigitalocean.app/api/cons/${id}`,
        { cons_seen: "refused" }
      );
      fetchData(user.name);
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
            <div className="karar_container">
              <button
                onClick={(e) => handleRefuse(row._id, e)}
                className="negative_karar"
              >
                <i class="fa-solid fa-ban"></i>
              </button>
              <p className="karar_text">مسح</p>
            </div>
            {row.cons_seen === "true" ? (
              <div className="karar_container">
                <a
                  href={`/asar/cons/${row._id}`}
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
      {cons.length > 0 && user ? (
        <div className="one_card_container">
          <DataTable columns={columns} data={cons} />
          <Tooltip id="my-tooltip" place="top" />
          <ToastContainer />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default MyCons;
