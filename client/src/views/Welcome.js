import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import randomCodeGenerator from "../utils/randomCodeGenerator";
import Button from "@mui/material/Button";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { generateRandomPath } from "../utils/generateRandomPath";
// import { StyledButton } from "../components/StyledButton";

const Welcome = ({ redirectTo, images: { show, image } }) => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");
  const imagePath =
    image === "trial" ? "/assets/trial.png" : generateRandomPath();
  const showImages = show;

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
    <div className="welcome w-100 bc-red container text-center w-80 p-3">
      <div className="row align-items-center justify-content-center">
        <div className="w-75 h-50 row text-center align-items-center justify-content-center my-2 p-2">
          {showImages && (
            <img
              className="img-tumbnail w-75"
              alt="Animal aleatorio"
              src={imagePath}
            />
          )}
        </div>
        <div className=" container text-center row w-100 justify-content-center align-items-center my-2">
          <div className="col-6 align-items-center justify-content-center ">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="123456"
                onChange={event => setRoomCode(event.target.value)}
              />
              <label for="floatingInput">Room code</label>
            </div>
          </div>
          <div className="col-4">
            <Button onClick={joinRoom} variant="contained">
              JOIN GAME
            </Button>
            {/* <StyledButton onClick={joinRoom} placeholder="JOIN GAME" /> */}
          </div>
        </div>
        <div className="row my-2">
          <h2>or</h2>
        </div>
        <div className="row my-2 w-75">
          <Button onClick={createRoom} variant="contained">
            CREATE GAME
          </Button>
          {/* <StyledButton onClick={createRoom} placeholder="CREATE GAME" /> */}
        </div>
      </div>
    </div>
  );
};

export { Welcome };
