import { useState, useEffect } from "react";
import no_kyas from "../../assets/no_kyas.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import kyas_logo_1 from "../../assets/kyas_logo_1.svg";
import kyas_logo_2 from "../../assets/kyas_logo_2.svg";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

function Kyas_asar_profile() {
  const [hasAsar, setHasAsar] = useState(false);
  const [comm, setComm] = useState();
  const [isComm, setIsComm] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [asar, setAsar] = useState(true);
  const [shownAsar, setShownAsar] = useState(0);

  const fetchComm = async () => {
    try {
      let id;
      const local_id = localStorage.getItem("_id");
      const comm_file = localStorage.getItem("comm_file");
      if (comm_file != null) {
        id = localStorage.getItem("_id");
        setIsComm(true);
        console.log("COMM");
      } else {
        try {
          const responseUser = await axios.get(
            `https://jellyfish-app-ew84k.ondigitalocean.app/api/users/${local_id}`
          );
          id = responseUser.data.comm_id;
          setIsAdmin(responseUser.data.admin);
          setIsComm(false);
          console.log("NOT COMM");
        } catch (error) {
          console.error("Error while fetching ahhhhhhh:", error);
        }
      }

      const responseComm = await axios.get(
        `https://jellyfish-app-ew84k.ondigitalocean.app/api/comm/${id}`
      );
      setComm(responseComm.data);
      if (responseComm.data.comm_asar) {
        const asarIds = responseComm.data.comm_asar;
        const fetchedAsars = [];

        for (const asarId of asarIds) {
          try {
            const responseAsar = await axios.get(
              `https://jellyfish-app-ew84k.ondigitalocean.app/api/asar/${asarId}`
            );
            fetchedAsars.push(responseAsar.data);
          } catch (error) {
            console.error("Error while fetching asar:", error);
          }
        }

        setAsar(fetchedAsars);
        console.log(fetchedAsars);
        if (fetchedAsars.length > 0) {
          setHasAsar(true);
        }
      } else {
        setHasAsar(false);
      }
      console.log(responseComm);
    } catch (error) {
      console.error("Error while fetching:", error);
    }
  };

  const handleDeleteAsar = async (e, asarId) => {
    e.preventDefault();

    Swal.fire({
      title: "تأكيد الحذف",
      text: "هل أنت متأكد أنك تريد حذف هذا القياس؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const responseAsar = await axios.delete(
            `https://jellyfish-app-ew84k.ondigitalocean.app/api/asar/${asarId}`
          );
          console.log(responseAsar);
          fetchComm();
          Swal.fire("Deleted!", "تم حذف القياس بنجاح.", "success");
        } catch (error) {
          console.error("Error while deleting asar:", error);
          Swal.fire("Error!", "حدث خطأ أثناء حذف القياس.", "error");
        }
      }
    });
  };
  const handleShowAsar = async (e, asarId) => {
    const index = asar.findIndex((item) => item._id === asarId);
    setShownAsar(index);
    console.log(index);
  };

  useEffect(() => {
    fetchComm();
  }, []);

  const columns = [
    {
      name: "قرار",
      selector: (row) => (
        <div className="karar">
          <a className="positive_karar" href={`/asar/${row._id}`}>
            <i class="fa-solid fa-eye"></i>
          </a>
            <a href={`/asar/edit/${row._id}`} className="positive_karar">
              <i class="fa-solid fa-pen-to-square"></i>
            </a>
            <button
              onClick={(e) => handleDeleteAsar(e, row._id)}
              className="negative_karar"
            >
              <i class="fa-solid fa-x"></i>
            </button>
            <a href={`/asar/settings/${row._id}`} className="positive_karar">
            <i class="fa-solid fa-universal-access"></i>
          </a>
        </div>
      ),
    },
    {
      name: (
        <span
          style={{
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: "1.5",
            textAlign: "center",
          }}
        >
          العائد الاجتماعي على الاستثمار
        </span>
      ),
      selector: (row) => <p className="important">{row.aed}</p> || "_",
    },
    {
      name: (
        <span
          style={{
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: "1.5",
            textAlign: "center",
          }}
        >
          صافي القيمة المجتمعية
        </span>
      ),
      selector: (row) =>
        <p className="important">{row.safy_kema_mogtama3ya}</p> || "_",
    },
    {
      name: "إجمالي الموارد",
      selector: (row) => <p className="important">{row.mod5alat}</p> || "_",
    },
    {
      name: "الي",
      selector: (row) => row.project_info.endDate || "_",
    },
    {
      name: "من",
      selector: (row) => row.project_info.startDate || "_",
    },
    {
      name: "اسم المشروع",
      selector: (row) => row.project_info.projectName || "_",
    },
    {
      name: "حالة المشروع",
      selector: (row) => (
        <>
          {row.project_goals_1 ? (
            <p
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              جاهز{" "}
              <i class="fa-solid fa-circle" style={{ color: "#02e254" }}></i>
            </p>
          ) : (
            <p
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              مسودة{" "}
              <i class="fa-solid fa-circle" style={{ color: "orange" }}></i>
            </p>
          )}
        </>
      ),
    },
  ];
  return (
    <>
      <div className="card_container profile_kyas">
        {hasAsar == true ? (
          <div className="yes_kyas">
            <div className="yes_kyas_table">
              <DataTable columns={columns} data={asar} />
              <Link className="link_btn" to="/asar">
                إنشاء قياس جديد <i class="fa-solid fa-plus"></i>
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="no_kyas">
              <img src={no_kyas} />
              <h1 className="no_kyas_title">
                لم تقم المؤسسة بأى قياس أثر من قبل
              </h1>
              <Link className="link_btn" to="/asar">
                إنشاء قياس جديد <i class="fa-solid fa-plus"></i>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Kyas_asar_profile;
