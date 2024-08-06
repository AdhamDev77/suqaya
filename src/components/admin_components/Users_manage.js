import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import no_kyas from "../../assets/no_kyas.svg";
import axios from "axios";

function Kyas_asar_profile() {
  const [trueMos, setTrueMos] = useState([]);
  const [falseMos, setFalseMos] = useState([]);
  const [oldMos, setOldMos] = useState([]);
  const fetchDataTrue = async () => {
    try {
      const response = await axios.get(
        "https://jellyfish-app-ew84k.ondigitalocean.app/api/users/getMos"
      );
      console.log("Get successful:", response.data);
      setTrueMos(response.data);
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  const fetchDataFalse = async () => {
    try {
      const response = await axios.get(
        "https://jellyfish-app-ew84k.ondigitalocean.app/api/users/getMosReq"
      );
      console.log("Get successful:", response.data);
      setFalseMos(response.data);
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  const fetchDataOld = async () => {
    try {
      const response = await axios.get(
        "https://jellyfish-app-ew84k.ondigitalocean.app/api/users/getMosOld"
      );
      console.log("Get successful:", response.data);
      setOldMos(response.data);
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };

  useEffect(() => {
    fetchDataTrue();
    fetchDataFalse();
    fetchDataOld();
  }, []);

  const handleApprove = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://jellyfish-app-ew84k.ondigitalocean.app/api/users/${id}`,
        { isMos: true, isMosReq: false, isMosOld: false }
      );
      console.log("Approved successful:", response.data);
      fetchDataTrue();
      fetchDataFalse();
      fetchDataOld();
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  const handleRemoveOld = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://jellyfish-app-ew84k.ondigitalocean.app/api/users/${id}`,
        { isMos: false, isMosReq: false, isMosOld: true }
      );
      console.log("De-Approved successful:", response.data);
      fetchDataTrue();
      fetchDataFalse();
      fetchDataOld();
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  const handleRemove = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://jellyfish-app-ew84k.ondigitalocean.app/api/users/${id}`,
        { isMos: false, isMosReq: false }
      );
      console.log("De-Approved successful:", response.data);
      fetchDataTrue();
      fetchDataFalse();
      fetchDataOld();
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  const columnsTrue = [
    {
      name: "اجراءات",
      selector: (row) => (
        <div className="karar">
          <button
            onClick={(e) => handleRemoveOld(e, row._id)}
            className="negative_karar"
          >
            <i class="fa-solid fa-x"></i>
          </button>
          <a href={`/view/mos/${row._id}`} className="positive_karar">
            <i class="fa-solid fa-magnifying-glass"></i>
          </a>
        </div>
      ),
    },
    {
      name: "بريد المستشار",
      selector: (row) => row.email,
    },
    {
      name: "CV",
      selector: (row) => <a href={row.mos_cv}>الرابط</a>,
    },
    {
      name: "اسم المستشار",
      selector: (row) => row.name,
    },
  ];
  const columnsFalse = [
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
          <button
            onClick={(e) => handleApprove(e, row._id)}
            className="positive_karar"
          >
            <i class="fa-solid fa-check"></i>
          </button>
        </div>
      ),
    },
    {
      name: "بريد المستشار",
      selector: (row) => row.email,
    },
    {
      name: "CV",
      selector: (row) => <a href={row.mos_cv}>الرابط</a>,
    },
    {
      name: "اسم المستشار",
      selector: (row) => row.name,
    },
  ];
  const columnsOld = [
    {
      name: "اجراءات",
      selector: (row) => (
        <div className="karar">
          <button
            onClick={(e) => handleApprove(e, row._id)}
            className="positive_karar"
          >
            <i class="fa-solid fa-rotate-left"></i>
          </button>
          <a href={`/view/mos/${row._id}`} className="positive_karar">
            <i class="fa-solid fa-magnifying-glass"></i>
          </a>
        </div>
      ),
    },
    {
      name: "بريد المستشار",
      selector: (row) => row.email,
    },
    {
      name: "CV",
      selector: (row) => <a href={row.mos_cv}>الرابط</a>,
    },
    {
      name: "اسم المستشار",
      selector: (row) => row.name,
    },
  ];

  return (
    <>
      {falseMos && trueMos && oldMos ? (
        <div className="card_container_admin">
          <div className="admin_table_con">
            <h1 className="admin_table_title">المستشارون الحاليون</h1>
            <DataTable columns={columnsTrue} data={trueMos} />
          </div>
          <div className="admin_table_con">
            <h1 className="admin_table_title">طلبات التعيين</h1>
            <DataTable columns={columnsFalse} data={falseMos} />
          </div>
          <div className="admin_table_con">
            <h1 className="admin_table_title">مستشارون مرفوضون</h1>
            <DataTable columns={columnsOld} data={oldMos} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Kyas_asar_profile;
