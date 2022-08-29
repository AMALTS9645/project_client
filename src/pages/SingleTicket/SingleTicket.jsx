import "./singleTicket.scss";
import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "timeago.js";
import TicketChat from "./TicketChat/TicketChat";

const SingleTicket = ({ user }) => {
  const scrollRef = useRef();
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [info, setInfo] = useState();
  const [close, setClose] = useState(false);

  useEffect(() => {
    const handleTickets = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/tickets/all/${params.id}`
        );
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleTickets();
  }, []);
  //   console.log(data);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  const handleChange = (e) => {
    setInfo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async () => {
    // e.preventDefault();
    try {
      const newMessage = {
        conversations: [
          {
            sender: data?.clientId,
            ...info,
          },
        ],
      };
      await axios.put(
        `http://localhost:8080/api/tickets/${params.id}`,
        newMessage
      );
      toast.success("Message Sent", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.reload();
      // setopen(false);
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleStatus = async () => {
    try {
      const newStatus = {
        status: "closed",
      };
      await axios.put(
        `http://localhost:8080/api/tickets/status/${params.id}`,
        newStatus
      );
      toast.success("Ticket Closed", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.reload();
      //   navigate("/support");
      // setopen(false);
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  //   console.log(info);
  return (
    <div className="singleTicket">
      <div className="singleContainers">
        <ToastContainer />
        <Navbar data={user} />
        <Header type="list" />
        <div className="tDetails">
          <div className="ticketDec">
            <div className="tktDetail">
              <p className="subject">Problem : </p>
              {data?.subject}
            </div>
            <div className="tktDetail">
              <p className="subject">Status : </p>
              {data?.status}
            </div>
            <div className="tktDetail">
              <p className="subject">Opened Date : </p>
              {format(data?.openAt)}
            </div>
            <div className="tktDetail">
              <p className="subject">Details : </p>
              {data?.details}
            </div>
          </div>
          <div className="chatWindow">
            <div className="msgHead">
              <div className="fromMe">Your Message</div>
              <div className="fromMe">Reply From Operator</div>
            </div>
            <div className="tktConversation">
              {data?.conversations.map((m) => (
                <div ref={scrollRef} key={m._id}>
                  <TicketChat message={m} own={m.sender === data?.clientId} />
                </div>
              ))}
            </div>
          </div>
          <div className="textMsg">
            Write
            <textarea
              id="message"
              name="det"
              className="chatText"
              type="textarea"
              placeholder="Details"
              required
              onChange={handleChange}
            ></textarea>
            <div className="sendButtonTkt">
              <button onClick={handleClick} className="sendTkt">
                Send
              </button>
            </div>
          </div>
        </div>
        {data?.status !== "closed" && !close && (
          <div className="tktClose">
            <button onClick={(e) => setClose(!close)} className="tktClosed">
              Close Ticket
            </button>
          </div>
        )}
      </div>
      {close && (
        <div className="closeConfirm">
          <div className="closeText">
            Are you sure you want to close the ticket
          </div>
          <div className="closeConfirmBtn">
            <button onClick={handleStatus} className="Yes">
              Yes
            </button>
            <button onClick={(e) => setClose(false)} className="no">
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleTicket;
