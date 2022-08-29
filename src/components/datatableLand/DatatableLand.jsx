import "./datatableLand.scss";
import { DataGrid } from "@mui/x-data-grid";
import { houseColumns, landColumns } from "../../components/datatablesource";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../components/hooks/useFetch";
import axios from "axios";

const DatatableLand = () => {
  const details = JSON.parse(localStorage.getItem("details"));
  const mail = details.email;

  // const [land, setLand] = useState();

  const { data, loading, error } = useFetch(`http://localhost:8080/api/lands`);

  const [list, setList] = useState(data);
  // console.log(list)

  useEffect(() => {
    setList(data.filter((item) => item.email === mail));
  }, [data]);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/lands/${id}`);
      // setList(land.filter((item) => item._id !== id));
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const handleRoute = () => {
          navigate(`/lands/${params.id}`, {
            state: { list },
          });
        };
        const handleUpdate = () => {
          navigate(`/lands/${params.id}`);
        };
        // console.log(params)
        return (
          <div className="cellAction">
            <div
              onClick={handleRoute}
              style={{ textDecoration: "none" }}
              className="viewButton"
            >
              View
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
            <div
              onClick={handleUpdate}
              style={{ textDecoration: "none" }}
              className="updateButton"
            >
              Update
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className="datatable">
        <div className="datatableTitle">Your Lands</div>
        <DataGrid
          className="datagrid"
          rows={list}
          columns={landColumns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </div>
    </>
  );
};

export default DatatableLand;
