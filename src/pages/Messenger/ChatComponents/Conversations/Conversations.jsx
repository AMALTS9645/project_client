import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./conversations.scss";

const Conversations = ({ conversation, currentUser }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/users/${friendId}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [conversation, currentUser]);

  return (
    <div className="conversation">
      <img
        src={
          user.img
            ? user.img
            : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
        }
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">
        {user.firstName} {user.lastName}
      </span>
    </div>
  );
};

export default Conversations;
