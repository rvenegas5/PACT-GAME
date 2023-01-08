import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Button from "@mui/material/Button";

// Server URL
const ENDPOINT = "http://localhost:80";

// Constants
let socket;
let maxPlayers = 4;

// const saveCookie = (user, players) => {
//   if (user && players) updateCookie(user, players);
// };

const updateCookie = (user, players) => {
  console.log("updateCookie init", user, players);
  Cookies.remove("pact-game");
  const cookie = {
    user: user,
    players: players
  };
  Cookies.set("pact-game.user", user.name, 1);
  Cookies.set("pact-game.id", user.id, 1);
  console.log("updateCookie end", user, players);
};

const WaitRoom = props => {
  const navigate = useNavigate();
  const [room, setRoom] = useState(Cookies.get("pact-game.roomCode"));
  const [roomFull, setRoomFull] = useState(false);
  const [user, setUser] = useState({});
  const [players, setPlayers] = useState([]);

  // Initialize socket
  useEffect(() => {
    if (players.length < maxPlayers) {
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
      updateCookie(user, players);
    } else {
      navigate(-1);
    }
  }, []);

  useEffect(() => {
    socket.on("roomFull", () => {
      setRoomFull(true);
    });

    socket.on("roomData", data => {
      // alert("roomData");
      console.log("roomData", data);
      setPlayers(data.users);
      if (data.users.length === maxPlayers - 1) {
        console.log("roomData3", data.users.length);
        setRoomFull(true);
      }
      updateCookie(user, players);
    });
    socket.on("currentUserData", ({ data }) => {
      // alert("currentUserData");
      console.log("currentUserData", data);
      setUser(data);
      updateCookie(user, players);
    });

    console.log("Saving cookie", user.id, user);
    updateCookie(user, players);
  }, []);

  // useEffect(() => {
  //   updateCookie(user, players);
  // }, [user]);
  // useEffect(() => {
  // updateCookie(user, players);
  // }, [players]);

  useEffect(() => {
    if (roomFull) navigate(`/room`);
  }, [roomFull]);

  // setTimeout(() => {
  //   if (roomFull) navigate(`/room`);
  // }, 1000);

  const quit = () => {
    navigate(-1);
  };

  const copyToClipboard = element => {
    let tempElement = document.createElement("textarea");
    tempElement.value = document.getElementById("roomCode").value;
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand("copy");
    document.body.removeChild(tempElement);
  };

  return (
    <div>
      {!roomFull && (
        <div className="container text-center">
          <div className="row align-items-center my-3">
            <h2 className="display-1">Waiting...</h2>
            <p className="display-4">Your are {user.name}</p>
            <p className="display-4">Share the code</p>
            <div className="text-center">
              <div class="form-floating w-50">
                <textarea
                  id="roomCode"
                  class="form-control"
                  placeholder="Leave a comment here"
                  disabled
                ></textarea>
                <label for="roomCode">{room}</label>
              </div>
              <Button onClick={copyToClipboard} variant="outlined">
                Copy
              </Button>
            </div>
            {/* <span className="display-6">{room}</span> */}
          </div>
          <div className="container text-center w-50">
            <div className="row justify-content-center align-items-center">
              <Button onClick={quit} variant="contained">
                QUIT
              </Button>
            </div>
          </div>
        </div>
      )}
      {roomFull && (
        <div className="container text-center">
          <div className="row align-items-center">
            <div className="row">
              <h1>THE ROOM IS FULL</h1>
            </div>
            <div className="row">
              <Button onClick={quit} variant="contained">
                QUIT
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { WaitRoom };
