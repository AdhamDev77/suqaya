import { useState, useEffect } from "react";
import no_kyas from "../../assets/no_kyas.svg";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import kyas_logo_1 from "../../assets/kyas_logo_1.svg";
import kyas_logo_2 from "../../assets/kyas_logo_2.svg";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import Loader from "../../assets/loader";
import loader2 from "../../assets/loader2.svg";

function Kyas_asar_profile() {
  let { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [hasAsar, setHasAsar] = useState(false);
  const [comm, setComm] = useState();
  const [user, setUser] = useState();
  const [isComm, setIsComm] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const [asar, setAsar] = useState(true);
  const [togglableAsars, setTogglableAsars] = useState([]);
  const [shownAsar, setShownAsar] = useState(0);

  const fetchComm = async () => {
    try {
      const comm_file = localStorage.getItem("comm_file");
      if (comm_file != null) {
        setIsComm(true);
        console.log("COMM");
      } else {
        try {
          const responseUser = await axios.get(
            `https://jellyfish-app-ew84k.ondigitalocean.app/api/users/${id}`
          );
          id = responseUser.data.comm_id;
          setIsAdmin(responseUser.data.admin);
          setIsComm(false);
          console.log("NOT COMM");
        } catch (error) {
          console.error("Error while fetching:", error);
        }
      }

      const responseComm = await axios.get(
        `https://jellyfish-app-ew84k.ondigitalocean.app/api/comm/${id}`
      );
      setComm(responseComm.data);
      console.log(responseComm);
    } catch (error) {
      console.error("Error while fetching:", error);
    }
  };

  const fetchThisUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://jellyfish-app-ew84k.ondigitalocean.app/api/users/${id}`
      );
      setUser(response.data);
      const ids = response.data.toggable_asars;

      // Fetch details for each ID
      const asarDetailsPromises = ids.map((id) =>
        axios.get(
          `https://jellyfish-app-ew84k.ondigitalocean.app/api/asar/${id}`
        )
      );
      const asarDetailsResponses = await Promise.all(asarDetailsPromises);
      const asarDetails = asarDetailsResponses.map((res) => res.data);

      // Set the fetched details in the state
      setTogglableAsars(asarDetails);
      console.log(asarDetails);
      console.log("asdasd");
      if (asarDetails.length > 0) {
        setHasAsar(true);
      }
    } catch (error) {
      console.error("Error while fetching user:", error);
    } finally {
      setLoading(false);
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

          // Fetch updated data
          fetchComm();
          fetchThisUser(); // Ensure this updates the state

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
    fetchThisUser();
  }, []); // Ensure no dependencies are missing

  const columns = [
    {
      name: "قرار",
      selector: (row) => (
        <div className="karar">
          {isAdmin ? (
            <div className="karar_container">
              <button
                onClick={(e) => handleDeleteAsar(e, row._id)}
                className="negative_karar"
              >
                <i class="fa-solid fa-x"></i>
              </button>
              <p className="karar_text">مسح</p>
            </div>
          ) : (
            <></>
          )}
          {isAdmin ? (
            <div className="karar_container">
              <a href={`/asar/edit/${row._id}`} className="positive_karar">
                <i class="fa-solid fa-pen-to-square"></i>
              </a>
              <p className="karar_text">تعديل</p>
            </div>
          ) : (
            <></>
          )}
          <div className="karar_container">
            <a className="positive_karar" href={`/asar/${row._id}`}>
              <i class="fa-solid fa-eye"></i>
            </a>
            <p className="karar_text">رؤية</p>
          </div>
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
      selector: (row) =>
        (
          <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content={row.project_info.projectName}
            data-tooltip-place="top"
          >
            {row.project_info.projectName}
          </a>
        ) || "_",
      sortable: true,
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
              <i class="fa-solid fa-circle" style={{ color: "#02e254" }}></i>
              جاهز{" "}
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
              <i class="fa-solid fa-circle" style={{ color: "orange" }}></i>
              مسودة{" "}
            </p>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <div className="card_container profile_kyas">
        {loading ? (
          <div className="loader_container">
            {/* <Loader /> */}
            <img src={loader2} alt="loader" />
          </div>
        ) : (
          <>
            {hasAsar ? (
              <div className="yes_kyas">
                <div className="yes_kyas_table">
                  <DataTable columns={columns} data={togglableAsars} />
                  {/* {isAdmin === true ? (
                    <Link className="link_btn" to="/asar">
                      إنشاء قياس جديد <i class="fa-solid fa-plus"></i>
                    </Link>
                  ) : (
                    <></>
                  )} */}
                </div>
              </div>
            ) : (
              <>
                <div className="no_kyas">
                  <img src={no_kyas} />
                  <h1 className="no_kyas_title">
                    لم تقم المؤسسة بأى قياس أثر من قبل
                  </h1>
                  {/* <Link className="link_btn" to="/asar">
                    إنشاء قياس جديد <i class="fa-solid fa-plus"></i>
                  </Link> */}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Kyas_asar_profile;
