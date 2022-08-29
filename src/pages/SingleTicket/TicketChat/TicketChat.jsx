import "./ticketChat.scss";
import { format } from "timeago.js";

const TicketChat = ({ message, own }) => {
  return (
    <div className={own ? "message " : "message own"}>
      <div className="messageTop">
        <p className="messageText">{message.message}</p>
      </div>
      <div className="messageBottom">{format(message.msgAt)}</div>
    </div>
  );
};

export default TicketChat;
