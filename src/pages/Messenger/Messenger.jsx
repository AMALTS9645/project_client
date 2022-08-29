import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./messenger.scss";
import Topbar from "./ChatComponents/Topbar/Topbar";
import Conversations from "./ChatComponents/Conversations/Conversations";
import Message from "./ChatComponents/Message/Message";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";

const Messenger = ({ setOpen }) => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scrollRef = useRef();

  const data = JSON.parse(localStorage.getItem("details"));

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/conversations/" + data._id
        );
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: data._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    try {
      const res = await axios.post(
        "http://localhost:8080/api/messages",
        message
      );
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="singleMessage">
      <div className="singleItem">
        <div className="editButtonMessage">
          <div onClick={() => setOpen(false)} className="closeButtons">
            <FontAwesomeIcon icon={faCircleXmark} className="rClose" />
          </div>
        </div>
        <Topbar />
        <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input
                placeholder="Search for users"
                type="text"
                className="chatMenuInput"
              />
              {conversations.map((c) => (
                <div key={c._id} onClick={() => setCurrentChat(c)}>
                  <Conversations conversation={c} currentUser={data} />
                </div>
              ))}
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {messages.map((m) => (
                      <div ref={scrollRef} key={m._id}>
                        <Message message={m} own={m.sender === data._id} />
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="wrie something..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <span className="noConv">
                  Open a conversation to start a chat
                </span>
              )}
            </div>
          </div>
          <div className="chatOnline">
            <div className="chatOnlineWrapper">Chat</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
