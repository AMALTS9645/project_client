import { DataGrid } from "@mui/x-data-grid";
import { ticketColumns } from "../../components/datatablesource";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar";
import "./support.scss";
import AddTicket from "../AddTickets/AddTicket";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Support = ({ user }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [pending, setPending] = useState();
  const [ticketno, setTicketno] = useState();

  const owner = JSON.parse(localStorage.getItem("details"));

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tickets/${id}`);
      // setList(land.filter((item) => item._id !== id));
      setData(data.filter((item) => item._id !== id));
      toast.success("Ticket Deleted", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleTickets = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/tickets/user/${owner._id}`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleTickets();
  }, []);

  useEffect(() => {
    const handlePending = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/tickets/countByType/${owner._id}`
        );
        setPending(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    handlePending();
  }, []);

  useEffect(() => {
    const handleTicketNo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/tickets/countByType/no/${owner._id}`
        );
        setTicketno(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleTicketNo();
  }, []);

  // console.log(data)

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const handleRoute = () => {
          navigate(`/singleticket/${params.id}`);
        };
        // const handleUpdate = () => {
        //   navigate(`/lists/${params.id}`);
        // };
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
          </div>
        );
      },
    },
  ];

  //   console.log(ticket)
  return (
    <div className="supportContainer">
      <ToastContainer />
      <Navbar data={user} />
      <Header type="list" />
      <div className="supportWrapper">
        {!open && (
          <button onClick={(e) => setOpen(true)} className="addTicket">
            Add New Ticket
          </button>
        )}
        {open && <AddTicket setopen={setOpen} />}
        <div className="ticketTable">
          <div className="tktFull">
            <div className="totalTkt">Total Tickets : </div>
            <p className="numberTkt">{ticketno}</p>
          </div>
          <div className="tktFull">
            <div className="totalTkt">Pending Tickets :</div>
            <p className="numberTkt">{pending}</p>
          </div>
          <div className="datatableSupport">
            <div className="datatableTitleSupport">Your Tickets</div>
            <DataGrid
              className="datagridSupport"
              rows={data}
              columns={ticketColumns.concat(actionColumn)}
              pageSize={9}
              rowsPerPageOptions={[9]}
              checkboxSelection
              getRowId={(row) => row._id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
