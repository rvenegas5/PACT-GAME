import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import randomCodeGenerator from "../utils/randomCodeGenerator";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "@mui/material/";
import { useEffect } from "react";
import { ModalRoom } from "../components/Modals/ModalRoom";
import { Manual } from "../components/Manual/Manual";
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
          <ModalRoom
            payload={joinRoom}
            room={[roomCode, setRoomCode]}
            image="trial"
            type="join"
          />
        </div>
        <div className="homepage-create">
          <ModalRoom
            payload={createRoom}
            room={[roomCode, setRoomCode]}
            image="trial"
            type="create"
          />
        </div>
        <div className="homepage-manual">
          <Manual
            modal={{ openTutorial, setOpenTutorial }}
            handleCloseTutorial={handleCloseTutorial}
          />
        </div>
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
