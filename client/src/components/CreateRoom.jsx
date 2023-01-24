import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Modal,
  Box
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";
import { generateRandomPath } from "../utils/generateRandomPath";
import { style } from "../config/Constants";

function CreateRoom({
  room: { setRoomCode, joinRoom, createRoom },
  images: { show, image }
}) {
  const imagePath =
    image === "trial" ? "./assets/trial.png" : generateRandomPath();
  const showImages = show;
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button className="homepage-button" onClick={createRoom}>
        Crear una Sala
      </button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="titleCloseBtn">
            <Button onClick={handleClose}>
              <CancelIcon />
            </Button>
          </div>
          {showImages && (
            <CardContent className="welcome--image-container">
              <img
                className="img-tumbnail w-5"
                alt="Animal aleatorio"
                src={imagePath}
              />
            </CardContent>
          )}

          <div className="body">
            <p className="message-modal">Ingrese el código de sala:</p>
            <input
              className="inputCode"
              type="text"
              placeholder="Código de Sala"
              onChange={event => setRoomCode(event.target.value)}
            />
          </div>
          <div className="body">
            <p className="message-modal">Nombre de Usuario:</p>
            <input
              className="inputCode"
              type="text"
              placeholder="Nombre"
              value={userName}
              // onChange={event => setUserName(event.target.value)}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export { CreateRoom };
