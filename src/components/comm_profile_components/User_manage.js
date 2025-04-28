import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import no_kyas from "../../assets/no_kyas.svg";
import axios from "axios";

function User_manage({ local_id }) {
  const [comm, setComm] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const fetchComm = async () => {
    try {
      const response = await axios.get(
        `https://suqaya-backend.onrender.com/api/comm/${local_id}`
      );
      console.log(response.data.comm_name);
      const approvedIds = response.data.approvedMembers;
      const pendingIds = response.data.pendingMembers;
      console.log(pendingIds);

      const fetchApprovedUsersPromises = approvedIds.map(async (userId) => {
        const userResponse = await axios.get(
          `https://suqaya-backend.onrender.com/api/users/${userId}`
        );
        return userResponse.data;
      });
      const fetchNewUsersPromises = pendingIds.map(async (userId) => {
        const userResponse = await axios.get(
          `https://suqaya-backend.onrender.com/api/users/${userId}`
        );
        return userResponse.data;
      });
      const fetchedApprovedUsers = await Promise.all(
        fetchApprovedUsersPromises
      );
      const fetchedNewUsers = await Promise.all(fetchNewUsersPromises);

      const filteredApprovedUsers = fetchedApprovedUsers.filter(
        (user) => user.approved == true
      );
      const filteredNewUsers = fetchedNewUsers.filter(
        (user) => user.approved == false
      );

      setApprovedUsers(filteredApprovedUsers);
      setNewUsers(filteredNewUsers);

      console.log(filteredApprovedUsers);
      console.log(filteredNewUsers);
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  useEffect(() => {
    fetchComm();
  }, []);

  const handleApprove = async (e, id) => {
    e.preventDefault();
    console.log(id);
    try {
      const response = await axios.put(
        `https://suqaya-backend.onrender.com/api/comm/accept/${local_id}`,
        { id: id }
      );
      console.log("Approved successful:", response.data);
      fetchComm();
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  const handleRemove = async (e, id) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://suqaya-backend.onrender.com/api/comm/remove/${local_id}`,
        { id: id }
      );
      console.log("Deleted successful:", response.data);
      fetchComm();
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  const ApprovedColumns = [
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
      name: "بريد المستخدم",
      selector: (row) => row.email,
    },
    {
      name: "اسم المستخدم",
      selector: (row) => row.name,
      
    },
  ];
  const NewColumns = [
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
      name: "بريد المستخدم",
      selector: (row) => row.email,
    },
    {
      name: "اسم المستخدم",
      selector: (row) => row.name,
      
    },
  ];

  return (
    <>
      {newUsers ? (
        <div className="card_container_admin">
          <div className="table_con">
            <h1>الأعضاء الفعليين</h1>
            <DataTable columns={ApprovedColumns} data={approvedUsers} />
          </div>
          <div className="table_con">
            <h1>طلبات الانضمام</h1>
            <DataTable columns={NewColumns} data={newUsers} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default User_manage;
