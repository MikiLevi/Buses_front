import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { IMessage } from "../interface/Message";

const socket = io("http://localhost:7979", {
  withCredentials: true,
});

export default function SocketIo() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [currentRoom, setCurrentRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    socket.on("receiveMessage", (newMessage: IMessage) => {
      setMessages((prevMessage) => [...prevMessage, newMessage]);
    });
    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  useEffect(() => {
    console.log(message);
  }, [messages]);

  const sendToMessage = () => {
    if (message.trim() && currentRoom && userName) {
      socket.emit("SendMassegeToRoom", {
        userName,
        message,
        roomName: currentRoom,
      });
      setMessage("");
    }
  };

  const sendToRoom = () => {
    if (message.trim() && currentRoom && userName) {
      socket.emit("joinRoom", roomName);
      setCurrentRoom(roomName);
      setMessages([]);
    } else {
      alert("Enter room name");
    }
  };
  return (
    <>
      <h3>Chat page</h3>
      {!currentRoom && (
        <div>
          <div>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="enter your roomName"
            />
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="enter your user name"
            />
            <button onClick={() => sendToRoom()}>send</button>
          </div>
        </div>
      )}
      {currentRoom && (
        <div>
          <div>
            {messages.map((mess, index) => (
              <div>
                {mess.userName === userName ? (
                  <p style={{ marginLeft: "300px" }}>{mess.message}</p>
                ) : (
                  <p style={{ marginRight: `300px` }}>{mess.message}</p>
                )}
                {mess.userName === userName ? (
                  <p style={{ marginLeft: "300px" }}>{mess.userName}</p>
                ) : (
                  <p style={{ marginRight: `300px` }}>{mess.userName}</p>
                )}
              </div>
            ))}
          </div>
          <div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="enter your message"
            />
            <button onClick={() => sendToMessage()}>send</button>
          </div>
        </div>
      )}
    </>
  );
}
