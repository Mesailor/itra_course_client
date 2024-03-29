import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useState } from "react";
import apiService from "../../services/APIService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function AdminPage() {
  const user = useSelector((store) => store.user);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  if (!user.isAdmin) {
    navigate("/main");
  }

  useEffect(() => {
    (async () => {
      const usersResult = await apiService.getUsers();
      if (!usersResult.success) {
        return console.log(usersResult.message);
      }
      setUsers(usersResult.users);
    })();
  }, []);

  function controls() {
    return <div className="btn-group">control buttons here</div>;
  }
  return (
    <div className="container">
      <h3 className="display-3 text-center">Admin Panel</h3>
      <DataTable className="mx-3 table" stripedRows value={users}>
        <Column field="id" header="id"></Column>
        <Column field="name" header="name"></Column>
        <Column field="isAdmin" header="isAdmin"></Column>
        <Column body={controls}></Column>
      </DataTable>
    </div>
  );
}
