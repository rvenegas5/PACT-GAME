import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useLocation } from "react-router-dom";

// Server URL
const ENDPOINT = "http://localhost:80";

// Constants
let socket;
let maxPlayers = 4;

const WaitRoom = props => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const [room, setRoom] = useState(code);
  const [roomFull, setRoomFull] = useState(false);
  const [players, setPlayers] = useState([]);
  const [user, setUser] = useState({});

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

  useEffect(() => {
    socket.on("roomData", ({ users }) => {
      console.log(users);
    });
    socket.on("currentUserData", ({ user }) => {
      players.push(user);
      setUser(user);
    });
  });

  setTimeout(() => {
    console.log("Timeout", user);
  }, 2000);

  const validateFull = () => {
    if (players.length === maxPlayers) setRoomFull(true);
  };
  return (
    <div>
      {!roomFull && (
        <div>
          <h2>Waiting </h2> <p>Share the code</p> <span>{room}</span>
        </div>
      )}
      {roomFull && <p>Loading room</p>}
    </div>
  );
};

export { WaitRoom };
