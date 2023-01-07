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
  const [user, setUser] = useState({});
  const [players, setPlayers] = useState([]);

  // Initialize socket
  useEffect(() => {
    if (players.length < 4) {
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
    } else {
      navigate(-1);
    }
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

    socket.on("roomData", data => {
      // alert("roomData");
      console.log("roomData", data);
      setPlayers(data.users);
    });
    socket.on("currentUserData", ({ data }) => {
      // alert("currentUserData");
      console.log("currentUserData", data);
      setUser(data);
    });
  }, []);

  useEffect(() => {
    if (roomFull) navigate(-1, `/room?code=${room}`, { state: { players: players } });
  }, [roomFull]);

  return (
    <div>
      {!roomFull && (
        <div>
          <h2>Waiting </h2>
          <p>Your are {user.name}, share the code</p>
          <span>{room}</span>
        </div>
      )}
      {roomFull && <p>The room is full</p>}
    </div>
  );
};

export { WaitRoom };
