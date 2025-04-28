import { useState, useEffect } from "react";
import no_kyas from "../../assets/no_kyas.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import loader2 from "../../assets/loader2.svg";

function Kyas_asar_profile({ local_id }) {
  const [loading, setLoading] = useState(false);
  const [hasAsar, setHasAsar] = useState(false);
  const [comm, setComm] = useState();
  const [asar, setAsar] = useState([]);
  const [shownAsar, setShownAsar] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showReady, setShowReady] = useState(true);
  const [showDraft, setShowDraft] = useState(true);
  let isAdminLocal = localStorage.getItem("admin_admin");

  // Calculate counts
  const getCounts = () => {
    const totalCount = asar.length;
    const readyCount = asar.filter((item) => item.project_goals_1).length;
    const draftCount = asar.filter((item) => !item.project_goals_1).length;
    return { totalCount, readyCount, draftCount };
  };

  const fetchComm = async () => {
    try {
      setLoading(true);

      const responseComm = await axios.get(
        `https://suqaya-backend.onrender.com/api/comm/${local_id}`
      );
      setComm(responseComm.data);

      if (
        responseComm.data.comm_asar &&
        responseComm.data.comm_asar.length > 0
      ) {
        const asarIds = responseComm.data.comm_asar;

        const asarPromises = asarIds.map((asarId) =>
          axios
            .get(
              `https://suqaya-backend.onrender.com/api/asar/${asarId}`
            )
            .then((response) => response.data)
            .catch((error) => {
              console.error(`Error fetching asar ${asarId}:`, error);
              return null;
            })
        );

        const fetchedAsars = await Promise.all(asarPromises);
        const validAsars = fetchedAsars.filter((asar) => asar !== null);

        setAsar(validAsars);
        setHasAsar(validAsars.length > 0);
      } else {
        setAsar([]);
        setHasAsar(false);
      }

      console.log(responseComm);
    } catch (error) {
      console.error("Error while fetching:", error);
      setAsar([]);
      setHasAsar(false);
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
            `https://suqaya-backend.onrender.com/api/asar/${asarId}`
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleShowReadyChange = () => {
    setShowReady(!showReady);
  };

  const handleShowDraftChange = () => {
    setShowDraft(!showDraft);
  };

  useEffect(() => {
    fetchComm();
  }, []);

  const filteredAsar = asar.filter((item) => {
    const matchesSearchQuery = item.project_info.projectName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      (showReady && item.project_goals_1) ||
      (showDraft && !item.project_goals_1);
    return matchesSearchQuery && matchesStatus;
  });

  console.log(filteredAsar);

  const columns = [
    {
      name: (
        <p>
          رؤية&nbsp;&nbsp;&nbsp;تعديل&nbsp;&nbsp;&nbsp;مسح&nbsp;&nbsp;&nbsp;صلاحيات
        </p>
      ),
      selector: (row) => (
        <div className="karar">
          <div className="karar_container">
            <a
              href={`/comm/${local_id}/asar/settings/${row._id}`}
              className="positive_karar"
            >
              <i className="fa-solid fa-universal-access"></i>
            </a>
          </div>
          <div className="karar_container">
            <button
              onClick={(e) => handleDeleteAsar(e, row._id)}
              className="negative_karar"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
          <div className="karar_container">
            <a href={`/asar/edit/${row._id}`} className="positive_karar">
              <i className="fa-solid fa-pen-to-square"></i>
            </a>
          </div>
          <div className="karar_container">
            <a className="positive_karar" href={`/asar/${row._id}`}>
              <i className="fa-solid fa-eye"></i>
            </a>
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
      selector: (row) => {
        return row.aed > 1 ? (
          <p className="important">{row.aed.toFixed(2) || "_"}</p>
        ) : (
          <p className="important_red">{row.aed.toFixed(2) || "_"}</p>
        );
      },
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
      selector: (row) => {
        return row.safy_kema_mogtama3ya > 0 ? (
          <p className="important">
            {Math.round(row.safy_kema_mogtama3ya) || "_"}
          </p>
        ) : (
          <p className="important_red">
            {Math.round(row.safy_kema_mogtama3ya) || "_"}
          </p>
        );
      },
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
            className="projectNameSmall"
          >
            {row.project_info.projectName}
          </a>
        ) || "_",
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
              <i
                className="fa-solid fa-circle"
                style={{ color: "#02e254" }}
              ></i>
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
              <i className="fa-solid fa-circle" style={{ color: "orange" }}></i>
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
            <img src={loader2} alt="loader" />
          </div>
        ) : (
          <>
            {hasAsar ? (
              <div className="yes_kyas">
                <div className="yes_kyas_table">
                  <div className="filter_cont">
                    <div className="flex">
                      <div className="search_holder">
                        <input
                          type="text"
                          placeholder="... ابحث عن قياس"
                          value={searchQuery}
                          onChange={handleSearchChange}
                          className="input_input_white"
                        />
                        <i className="fa-solid fa-magnifying-glass"></i>
                      </div>
                      <div className="filter_checkboxes">
                        <label>
                          <input
                            type="checkbox"
                            checked={showReady}
                            onChange={handleShowReadyChange}
                          />
                          جاهز
                        </label>
                        <label>
                          <input
                            type="checkbox"
                            checked={showDraft}
                            onChange={handleShowDraftChange}
                          />
                          مسودة
                        </label>
                      </div>
                    </div>
                    <div
                      className="stats-container"
                      style={{
                        display: "flex",
                        gap: "8px",
                        justifyContent: "space-between",
                        padding: "1rem",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "0.5rem",
                        marginBottom: "1rem",
                      }}
                    >
                      <div
                        className="stat-item"
                        style={{
                          textAlign: "center",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "0.25rem",
                          backgroundColor: "#fff",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        }}
                      >
                        <div className="stat-label">إجمالي القياسات</div>
                        <div
                          className="stat-value"
                          style={{ fontSize: "1rem", fontWeight: "bold" }}
                        >
                          {getCounts().totalCount}
                        </div>
                      </div>
                      <div
                        className="stat-item"
                        style={{
                          textAlign: "center",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "0.25rem",
                          backgroundColor: "#fff",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        }}
                      >
                        <div className="stat-label">جاهز</div>
                        <div
                          className="stat-value"
                          style={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            color: "#02e254",
                          }}
                        >
                          {getCounts().readyCount}
                        </div>
                      </div>
                      <div
                        className="stat-item"
                        style={{
                          textAlign: "center",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "0.25rem",
                          backgroundColor: "#fff",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                        }}
                      >
                        <div className="stat-label">مسودة</div>
                        <div
                          className="stat-value"
                          style={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            color: "orange",
                          }}
                        >
                          {getCounts().draftCount}
                        </div>
                      </div>
                    </div>
                  </div>

                  <DataTable columns={columns} data={filteredAsar} />
                  <Link className="link_btn" to="/asar">
                    إنشاء قياس جديد{" "}
                    <i className="fa-solid fa-plus search_icon"></i>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="no_kyas">
                <img src={no_kyas} alt="No Asar" />
                <h1 className="no_kyas_title">
                  لم تقم المؤسسة بأى قياس أثر من قبل
                </h1>
                <Link className="link_btn" to="/asar">
                  إنشاء قياس جديد <i className="fa-solid fa-plus"></i>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Kyas_asar_profile;
