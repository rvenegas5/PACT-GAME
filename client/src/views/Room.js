import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "@mui/material";
import { WaitRoom } from "../components/WaitRoom";
import { WaitRoom2 } from "../components/WaitRoom2";
import { maxPlayers, ENDPOINT, connectionOptions } from "../config/Constants";
import io from "socket.io-client";
// Constants
let socket;

// const saveCookie = (user, players) => {
//   if (user && players) updateCookie(user, players);
// };

const Room = ({ code }) => {
  const navigate = useNavigate();
  const room = code;
  const [roomFull, setRoomFull] = useState(false);
  const [user, setUser] = useState({});
  const [players, setPlayers] = useState([]);

  // Initialize socket
  useEffect(() => {
    if (players.length < maxPlayers) {
      socket = io.connect(ENDPOINT, connectionOptions);
      socket.emit("join", { room: room }, error => {
        if (error) return error;
      });
    } else {
      quit();
    }
    return () => {
      socket.emit("logOut");
      socket.off();
    };
  }, []);
  useEffect(() => {
    socket.on("roomFull", () => {
      setRoomFull(true);
    });
    socket.on("roomData", data => {
      localStorage.setItem("pact-game.players", JSON.stringify(data.users));
      if (data.users.length === maxPlayers) setRoomFull(true);
      setPlayers(data.users);
    });
    socket.on("currentUserData", ({ data }) => {
      localStorage.setItem("pact-game.user", JSON.stringify(data));
      setUser(data);
    });
  }, []);

  useEffect(() => {
    if (roomFull) initGame();
  }, [roomFull]);

  const quit = () => {
    navigate("/");
  };
  const initGame = () => {};
  return (
    <Container className="room" maxWidth="xs">
      {!roomFull && (
        <Container className="container text-center">
          <Container className="col align-items-center justify-content-center">
            {/* <WaitRoom room={room} quit={quit} /> */}
            <WaitRoom2 room={room} quit={quit} />
          </Container>
        </Container>
      )}
      {/* Display the game */}
      {roomFull && (
        <Container className="container text-center">
          <Container className="row align-items-center">
            <Container className="row">
              <h1>
                THE ROOM IS FULL,
                <span className="display-6">{user.name}</span>
              </h1>
            </Container>
            <Container className="row">
              <Button onClick={quit} variant="contained">
                QUIT
              </Button>
            </Container>
          </Container>
        </Container>
      )}
    </Container>
  );
};

export { Room };
