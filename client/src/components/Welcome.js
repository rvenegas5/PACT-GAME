import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import randomCodeGenerator from "../utils/randomCodeGenerator";
import Button from "@mui/material/Button";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Welcome = () => {
  const navigate = useNavigate();

  const [roomCode, setRoomCode] = useState("");

  const joinRoom = () => {
    if (roomCode === "") return;
    navigate(`/waitRoom?code=${roomCode}`);
  };

  const createRoom = () => {
    const roomCode = randomCodeGenerator(5);
    setRoomCode(roomCode);
    navigate(`/waitRoom?code=${roomCode}`);
  };

  return (
    <div className="Homepage">
      <div className="homepage-menu">
        <img alt="Logo del juego" src="logo.png" width="200px" />
        <div className="homepage-form">
          <div className="homepage-option">
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="123456"
                onChange={event => setRoomCode(event.target.value)}
              />
              <label for="floatingInput">Room code</label>
            </div>
            {/* <button className="game-button green">Unirse a una sala</button> */}
            <Button onClick={joinRoom} variant="contained">
              Unirse a una sala
            </Button>
          </div>
          <h2>or</h2>
          <div className="homepage-option">
            {/* <button className="game-button orange">Crear una Sala</button> */}
            <Button onClick={createRoom} variant="contained">
              Crear una Sala
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Welcome };
