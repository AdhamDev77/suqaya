import { useState, useEffect } from "react";
import DataTable from 'react-data-table-component';
import axios from "axios";

function User_manage() {
  const [comm, setComm] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [normalUsers, setNormalUsers] = useState([]);
  const fetchComm = async () => {
    try {
      const id = localStorage.getItem("_id")
      const response = await axios.get(`https://jellyfish-app-ew84k.ondigitalocean.app/api/comm/${id}`);
      console.log(response.data.comm_name)
      const approvedIds = response.data.approvedMembers;

      const fetchApprovedUsersPromises = approvedIds.map(async (userId) => {
        const userResponse = await axios.get(`https://jellyfish-app-ew84k.ondigitalocean.app/api/users/${userId}`);
        return userResponse.data;
      });
      const fetchedApprovedUsers = await Promise.all(fetchApprovedUsersPromises);

      const filteredAdminUsers = fetchedApprovedUsers.filter(user => user.admin == true);
      const filteredNormalUsers = fetchedApprovedUsers.filter(user => user.admin == false);

      setAdminUsers(filteredAdminUsers);
      setNormalUsers(filteredNormalUsers);

      console.log(filteredAdminUsers)
      console.log(filteredNormalUsers)
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  useEffect(() => {
    fetchComm();
  }, []);

  const handleApprove = async (e,id) => {
    e.preventDefault()
    console.log(id)
    try {
      const response = await axios.patch(`https://jellyfish-app-ew84k.ondigitalocean.app/api/users/${id}` , { admin: true });
      console.log("Approved successful:", response.data);
      fetchComm();
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  const handleRemove = async (e,id) => {
    e.preventDefault()
    try {
      const response = await axios.patch(`https://jellyfish-app-ew84k.ondigitalocean.app/api/users/${id}` , { admin: false });
      console.log("Deleted successful:", response.data);
      fetchComm();
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  const ApprovedColumns = [
    {
      name: 'اجراءات',
      selector: row => <div className="karar"><button onClick={(e) => handleRemove(e,row._id)} className="negative_karar"><i class="fa-solid fa-user-slash"></i></button></div>,
    },
    {
      name: 'بريد المستخدم',
      selector: row => row.email
    },
    {
      name: 'اسم المستخدم',
      selector: row => row.name,
    },
  ];
  const NewColumns = [
    {
      name: 'اجراءات',
      selector: row => <div className="karar"><button onClick={(e) => handleApprove(e,row._id)} className="positive_karar"><i class="fa-solid fa-user-shield"></i></button></div>,
    },
    {
      name: 'بريد المستخدم',
      selector: row => row.email
    },
    {
      name: 'اسم المستخدم',
      selector: row => row.name,
    },
  ];
  
  return (
    <>
    {normalUsers ?(
      <div className="card_container_admin">
        <div className="table_con">
        <h1>المديرين</h1>
      <DataTable
			columns={ApprovedColumns}
			data={adminUsers}
		/>
    </div>
    <div className="table_con">
    <h1>المستخدمين العاديين</h1>
      <DataTable
			columns={NewColumns}
			data={normalUsers}
		/>
    </div>
    </div>
    ):(<></>)}
</>
  )
}

export default User_manage