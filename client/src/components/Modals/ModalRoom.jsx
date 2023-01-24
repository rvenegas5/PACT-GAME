import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Modal,
  Box,
  TextField
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";
import { generateRandomPath } from "../../utils/generateRandomPath";
import { style, center, modal } from "../../config/Constants";

function ModalRoom({
  payload,
  room: [roomCode, setRoomCode],
  image,
  type
}) {
  const imagePath =
    image === "trial" ? "./assets/trial.png" : generateRandomPath();
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const buttonMessage = type === "join" ? "Unirse a sala" : "Crear sala";
  const buttonPayloadMessage = type === "join" ? "Unirse" : "Crear";

  const validateUsername = () => {
    if (userName === "") alert("Por favor, ingrese un nombre");
  };

  const validateRoomcode = () => {
    if (userName === "") alert("Por favor, ingrese un código de sala");
  };

  useEffect(() => {
    if (userName !== "") {
      localStorage.setItem("pact-game.userName", userName);
    }
  }, [userName]);

  const proxy = () => {
    if (type === "join") {
      validateRoomcode();
      validateUsername();
      if (userName !== "" && roomCode !== "") payload();
    } else {
      alert("Create");
      validateUsername();
      if (userName !== "") payload();
    }
  };

  return (
    <div>
      <button className="homepage-button unirse" onClick={handleOpen}>
        {buttonMessage}
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="titleCloseBtn">
            <Button onClick={handleClose}>
              <CancelIcon />
            </Button>
          </div>
          <Box sx={center}>
            <CardContent className="welcome--image-container">
              <img
                className="img-tumbnail w-5"
                alt="Animal aleatorio"
                src={imagePath}
              />
            </CardContent>
            {type === "join" && (
              <TextField
                id="outlined-basic"
                label="Código de Sala"
                variant="filled"
                type="text"
                className="inputCode"
                onChange={event => setRoomCode(event.target.value)}
              />
            )}
            <TextField
              id="outlined-basic"
              label="Nombre"
              variant="filled"
              type="text"
              className="inputCode"
              onChange={event => setUserName(event.target.value)}
            />
            <Button variant="contained" onClick={proxy}>
              {buttonPayloadMessage}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export { ModalRoom };
