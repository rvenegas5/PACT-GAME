import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import randomCodeGenerator from "../utils/randomCodeGenerator";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "@mui/material/";
import { useEffect } from "react";
import { JoinRoom } from "../components/JoinRoom";

// import { StyledButton } from "../components/StyledButton";

const Welcome = ({ redirectTo, images: { show, image } }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [roomCode, setRoomCode] = useState("");

  const saveRoomCode = roomCode => {
    localStorage.setItem("pact-game.roomCode", roomCode);
  };

  const joinRoom = () => {
    if (roomCode === "") return;
    saveRoomCode(roomCode);
    if (redirectTo === "game") navigate(`/game?roomCode=${roomCode}`);
    else navigate(redirectTo);
  };

  const createRoom = () => {
    const roomCode = randomCodeGenerator(5);
    setRoomCode(roomCode);
    saveRoomCode(roomCode);
    if (redirectTo === "game") navigate(`/game?roomCode=${roomCode}`);
    else navigate(redirectTo);
  };

  return (
    <Container maxWidth="xs">
      <JoinRoom
        room={{ createRoom, joinRoom, setRoomCode }}
        images={{ show: true, image: "trial" }}
      />
    </Container>
  );
};

export { Welcome };
