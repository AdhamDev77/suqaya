import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import no_kyas from "../../assets/no_kyas.svg"
import axios from "axios";

function Kyas_asar_profile() {
  const [trueComm, setTrueComm] = useState([]);
  const [falseComm, setFalseComm] = useState([]);
  const fetchDataTrue = async () => {
    try {
      const response = await axios.get("https://jellyfish-app-ew84k.ondigitalocean.app/api/comm/true");
      console.log("Get successful:", response.data);
      setTrueComm(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  const fetchDataFalse = async () => {
    try {
      const response = await axios.get("https://jellyfish-app-ew84k.ondigitalocean.app/api/comm/false");
      console.log("Get successful:", response.data);
      setFalseComm(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  useEffect(() => {
    const fetchDataTrue = async () => {
      try {
        const response = await axios.get("https://jellyfish-app-ew84k.ondigitalocean.app/api/comm/true");
        console.log("Get successful:", response.data);
        setTrueComm(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error while posting:", error);
      }
    };
    const fetchDataFalse = async () => {
      try {
        const response = await axios.get("https://jellyfish-app-ew84k.ondigitalocean.app/api/comm/false");
        console.log("Get successful:", response.data);
        setFalseComm(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error while posting:", error);
      }
    };
    fetchDataTrue();
    fetchDataFalse();
  }, []);

  const handleApprove = async (e, id) => {
    e.preventDefault()
    try {
      const response = await axios.post(`https://jellyfish-app-ew84k.ondigitalocean.app/api/comm/approve/${id}`);
      console.log("Approved successful:", response.data);
      fetchDataTrue()
      fetchDataFalse()
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  const handleRemove = async (e, id) => {
    e.preventDefault()
    try {
      const response = await axios.delete(`https://jellyfish-app-ew84k.ondigitalocean.app/api/comm/${id}`);
      console.log("Deleted successful:", response.data);
      fetchDataTrue()
      fetchDataFalse()
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  const columnsTrue = [
    {
      name: 'اجراءات',
      selector: row => <div className="karar"><button onClick={(e) => handleRemove(e, row._id)} className="negative_karar"><i class="fa-solid fa-x"></i></button></div>,
    },
    {
      name: 'وثائق المؤسسة',
      selector: row => <a href={row.comm_file}>الوثيقة</a>
    },
    {
      name: 'اسم المؤسسة',
      selector: row => row.comm_name,
    },
  ];
  const columnsFalse = [
    {
      name: 'اجراءات',
      selector: row => <div className="karar"><button onClick={(e) => handleApprove(e, row._id)} className="positive_karar"><i class="fa-solid fa-check"></i></button><button onClick={(e) => handleRemove(e, row._id)} className="negative_karar"><i class="fa-solid fa-x"></i></button></div>,
    },
    {
      name: 'وثائق المؤسسة',
      selector: row => <a href={row.comm_file}>الوثيقة</a>,
    },
    {
      name: 'اسم المؤسسة',
      selector: row => row.comm_name,
    },
  ];

  return (
    <>
      {falseComm ? (
        <div className="card_container_admin">
          <div className="admin_table_con">
            <h1 className="admin_table_title">المؤسسات النشطة</h1>
            <DataTable
              columns={columnsTrue}
              data={trueComm}
            />

          </div>
          <div className="admin_table_con">
            <h1 className="admin_table_title">طلبات إنشاء مؤسسة</h1>
            <DataTable
              columns={columnsFalse}
              data={falseComm}
            />
          </div>
        </div>
      ) : (<></>)}
    </>
  )
}

export default Kyas_asar_profile