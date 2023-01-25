import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Modal,
  Box,
  TextField,
  Alert,
  Collapse,
  IconButton
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { generateRandomPath } from "../../utils/generateRandomPath";
import { style, center, modal } from "../../config/Constants";

function ModalRoom({ payload, room: [roomCode, setRoomCode], image, type }) {
  const imagePath =
    image === "trial" ? "./assets/trial.png" : generateRandomPath();
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const buttonMessage = type === "join" ? "Unirse a sala" : "Crear sala";
  const buttonPayloadMessage = type === "join" ? "Unirse" : "Crear";
  const [showNameAlert, setShowNameAlert] = React.useState(false);
  const [showCodeAlert, setShowCodeAlert] = React.useState(false);

  const validateUsername = () => {
    if (userName === "") setShowNameAlert(true);
  };

  const validateRoomcode = () => {
    if (localStorage.getItem("pact-game.roomCode") === "")
      setShowCodeAlert(true);
  };

  useEffect(() => {
    setShowNameAlert(false);
    setShowCodeAlert(false);
  }, []);

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
      validateUsername();
      if (userName !== "") payload();
    }
  };

  return (
    <Box>
      <button className="homepage-button unirse" onClick={handleOpen}>
        {buttonMessage}
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box className="titleCloseBtn">
            <Button onClick={handleClose}>
              <CancelIcon />
            </Button>
          </Box>
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
            <Collapse in={showNameAlert}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setShowNameAlert(false)}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
                severity="warning"
              >
                Por favor, ingresa tu nick
              </Alert>
            </Collapse>
            <Collapse in={showCodeAlert}>
              <Alert
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => setShowNameAlert(false)}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
                severity="warning"
              >
                Por favor, ingresa el room code
              </Alert>
            </Collapse>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export { ModalRoom };
