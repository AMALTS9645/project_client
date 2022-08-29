import "./message.scss";
import { format } from "timeago.js";

const Message = ({ message, own }) => {

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
          alt=""
          className="messageImg"
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
