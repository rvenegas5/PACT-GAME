import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

// Server URL
const ENDPOINT = "http://localhost:80";

// Constants
let socket;
let maxPlayers = 4;

const Room = props => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");  const [room, setRoom] = useState(code);
  const [roomFull, setRoomFull] = useState(false);

  // Initialize socket
  useEffect(() => {
    const connectionOptions = {
      forceNew: true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"]
    };
    socket = io.connect(ENDPOINT, connectionOptions);
    socket.emit("join", { room: room }, error => {
      if (error) setRoomFull(true);
    });
    return function cleanup() {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);

  const validateFull = players => {
    if (players.length === maxPlayers) setRoomFull(true);
  };
  return <div>Room</div>;
};

export { Room };
