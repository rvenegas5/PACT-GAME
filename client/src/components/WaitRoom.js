import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate, useLocation } from "react-router-dom";

// Server URL
const ENDPOINT = "http://localhost:80";

// Constants
let socket;
let maxPlayers = 4;

const WaitRoom = props => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const [room, setRoom] = useState(code);
  const [roomFull, setRoomFull] = useState(false);
  const [users, setUser] = useState([]);

  // Initialize socket
  useEffect(() => {
    if (users.length < 4) {
      const connectionOptions = {
        forceNew: true,
        reconnectionAttempts: "Infinity",
        timeout: 10000,
        transports: ["websocket"]
      };
      socket = io.connect(ENDPOINT, connectionOptions);
      socket.emit("join", { room: room }, error => {
        if (error) console.error(error);
      });

    }
    socket.on("initGame", payload => {
      if (payload.initGame) {
        setRoomFull(true);
      }
    });

    return function cleanup() {
      socket.emit("logOut");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("roomFull", () => {
      alert("alert:Room is full");
      setRoomFull(true);
    });

    socket.on("roomData", ({ data }) => {
      console.log("roomData", data);
    });
    socket.on("currentUserData", ({ data }) => {
      console.log("currentUserData", data);
      users.push(data);
      setUser(data);
    });
  }, []);

  useEffect(() => {
    if (roomFull) {
      console.log("Room:", room, "redirecting...");
      navigate("room?code=" + room, { replace: true });
    }
  }, [roomFull]);

  useEffect(() => {
    if (users.length === maxPlayers) {
      alert("effect:The room is full");
      setRoomFull(true);
    }
  }, [users]);

  return (
    <div>
      {!roomFull && (
        <div>
          <h2>Waiting </h2>
          <p>Your are {users.name}, share the code</p>
          <span>{room}</span>
        </div>
      )}
      {roomFull && <p>The room is full</p>}
    </div>
  );
};

export { WaitRoom };
