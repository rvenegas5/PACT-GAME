import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import randomCodeGenerator from "../utils/randomCodeGenerator";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "@mui/material/";
import { useEffect } from "react";
import { JoinRoom } from "../components/JoinRoom";
import Manual from "../components/Manual/manual";
import { Button } from "@mui/material";

// import { StyledButton } from "../components/StyledButton";

const Welcome = ({ redirectTo, images: { show, image } }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [roomCode, setRoomCode] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [openTutorial, setOpenTutorial] = useState(false);

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

  const handleCloseTutorial = () => {
    setOpenTutorial(true);
  };

  return (
    <div className="homepage-menu">
      <div className="homepage-form">
        <div className="homepage-join">
          <JoinRoom
            room={{ createRoom, joinRoom, setRoomCode }}
            images={{ show: true, image: "trial" }}
          />
        </div>
        <div className="homepage-create">
          <button className="homepage-button create" onClick={createRoom}>
            Crear una Sala
          </button>
        </div>
        <button className="homepage-button tuto" onClick={handleCloseTutorial}>
          Manual del Juego
        </button>
        {openTutorial && <Manual setOpenTutorial={setOpenTutorial}></Manual>}
      </div>
    </div>

    // <Container className="welcome" maxWidth="xs">
    //   <JoinRoom
    //     room={{ createRoom, joinRoom, setRoomCode }}
    //     images={{ show: true, image: "trial" }}
    //   />
    // </Container>
  );
};

export { Welcome };
