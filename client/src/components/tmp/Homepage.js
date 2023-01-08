import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import randomCodeGenerator from "../../utils/randomCodeGenerator";

const Homepage = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");

  const redirectToGame = () => {
    navigate(`/play?roomCode=${roomCode}`);
  };
  const redirectToGameCreated = () => {
    navigate(`/play?roomCode=${randomCodeGenerator(5)}`);
  };

  return (
    <div className="Homepage">
      <div className="homepage-menu">
        <img src={require("../../assets/logo.png").default} width="200px" />
        <div className="homepage-form">
          <div className="homepage-join">
            <input
              style={{ padding: "7px", border: "0", width: "200px" }}
              type="text"
              placeholder="Ingresar un codigo"
              onChange={event => setRoomCode(event.target.value)}
            />
            <button onClick={redirectToGame} className="game-button green">
              Unirse a una sala
            </button>
          </div>
          <h1>OR</h1>
          <div className="homepage-create">
            <button
              onClick={redirectToGameCreated}
              className="game-button orange"
            >
              Crear una Sala
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Homepage };
