import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";

function Kyas_asar_settings() {
  const navigate = useNavigate();
  let { asar_id } = useParams();
  let { comm_id } = useParams();
  const [commUsers, setCommUsers] = useState([]);
  const [toggableUsers, setToggableUsers] = useState([]);
  const [unToggableUsers, setUnToggableUsers] = useState([]);

  useEffect(() => {
    let isComm = localStorage.getItem("comm_file");
    let isAdmin = localStorage.getItem("admin_admin");

    if (!isAdmin) {
      if (!isComm) {
        navigate("/");
      }
    }
  }, []);

  const fetchComm = async () => {
    try {
      const responseComm = await axios.get(
        `https://jellyfish-app-ew84k.ondigitalocean.app/api/comm/${comm_id}`
      );
      const responseAsar = await axios.get(
        `https://jellyfish-app-ew84k.ondigitalocean.app/api/asar/${asar_id}`
      );

      console.log(responseComm.data.approvedMembers);

      const ToggableUsersIds = responseAsar.data.toggable_users;
      const UnToggableUsersIds = responseComm.data.approvedMembers.filter(
        (userId) => !ToggableUsersIds.includes(userId)
      );

      setCommUsers(commUsers);

      // Fetch approved members details
      const ToggableUsersPromises = ToggableUsersIds.map(async (memberId) => {
        const memberResponse = await axios.get(
          `https://jellyfish-app-ew84k.ondigitalocean.app/api/users/${memberId}`
        );
        return memberResponse.data;
      });
      const ToggableUsers = await Promise.all(ToggableUsersPromises);
      setToggableUsers(ToggableUsers);

      // Fetch approved members details
      const UnToggableUsersPromises = UnToggableUsersIds.map(
        async (memberId) => {
          const memberResponse = await axios.get(
            `https://jellyfish-app-ew84k.ondigitalocean.app/api/users/${memberId}`
          );
          return memberResponse.data;
        }
      );
      const UnToggableUsers = await Promise.all(UnToggableUsersPromises);
      setUnToggableUsers(UnToggableUsers);
    } catch (error) {
      console.error("Error while fetching:", error);
    }
  };

  useEffect(() => {
    fetchComm();
  }, []);

  const handleApprove = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://jellyfish-app-ew84k.ondigitalocean.app/api/asar/toggle/${asar_id}`,
        { userId: id }
      );
      console.log("Approved successful:", response.data);
      fetchComm();
    } catch (error) {
      console.error("Error while approving:", error);
    }
  };

  const handleRemove = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://jellyfish-app-ew84k.ondigitalocean.app/api/asar/untoggle/${asar_id}`,
        { userId: id }
      );
      console.log("Deleted successful:", response.data);
      fetchComm();
    } catch (error) {
      console.error("Error while removing:", error);
    }
  };

  const ApprovedColumns = [
    {
      name: "اجراءات",
      cell: (row) => (
        <div className="karar">
          <button
            onClick={(e) => handleRemove(e, row._id)}
            className="negative_karar"
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
      ),
    },
    {
      name: "بريد المستخدم",
      selector: (row) => row.email,
    },
    {
      name: "اسم المستخدم",
      selector: (row) => row.name,
      sortable: true,
    },
  ];

  const BasicColumns = [
    {
      name: "اجراءات",
      cell: (row) => (
        <div className="karar">
          <button
            onClick={(e) => handleApprove(e, row._id)}
            className="positive_karar"
          >
            <i class="fa fa-plus" aria-hidden="true"></i>
          </button>
        </div>
      ),
    },
    {
      name: "بريد المستخدم",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "اسم المستخدم",
      selector: (row) => row.name,
    },
  ];

  return (
    <>
      <div className="card_container_admin">
        <div className="table_con">
          <h1>المشرفين</h1>
          <DataTable
            columns={ApprovedColumns}
            data={toggableUsers}
          />
        </div>
        <div className="table_con">
          <h1>سائر الأعضاء</h1>
          <DataTable
            columns={BasicColumns}
            data={unToggableUsers}
          />
        </div>
      </div>
    </>
  );
}

export default Kyas_asar_settings;
