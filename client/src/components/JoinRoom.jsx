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

function JoinRoom({
  room: { setRoomCode, joinRoom, createRoom },
  images: { show, image }
}) {
  const imagePath =
    image === "trial" ? "./assets/trial.png" : generateRandomPath();
  const showImages = show;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button className="homepage-button unirse" onClick={handleOpen}>
        Unirse a Sala
      </Button>
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
            <p
              style={{
                color: "black",
                fontSize: "20px",
                fontFamily: "Quicksand"
              }}
            >
              Ingrese el código de sala:
            </p>
            <input
              className="inputCode"
              type="text"
              placeholder="Código de Sala"
              onChange={event => setRoomCode(event.target.value)}
            />
          </div>
          <div className="body">
            <p
              style={{
                color: "black",
                fontSize: "20px",
                fontFamily: "Quicksand"
              }}
            >
              Nombre de Usuario:
            </p>
            <input
              className="inputCode"
              type="text"
              placeholder="username"
              onChange={event => console.log(event.target.value)}
            />
          </div>
          <div className="footer">
            <button onClick={joinRoom} id="IngresarBtn">
              Ingresar
            </button>
          </div>
        </Box>
      </Modal>
    </div>

    // <Card className="welcome--card">
    //   {showImages && (
    //     <CardContent className="welcome--image-container">
    //       <img
    //         className="img-tumbnail w-5"
    //         alt="Animal aleatorio"
    //         src={imagePath}
    //       />
    //     </CardContent>
    //   )}
    //   <CardContent className="welcome--content-container">
    //     <CardContent className="welcome--room-container">
    //       <div className="form-floating">
    //         <input
    //           type="text"
    //           className="form-control"
    //           id="floatingInput"
    //           placeholder="123456"
    //           onChange={event => setRoomCode(event.target.value)}
    //         />
    //         <label for="floatingInput">Room code</label>
    //       </div>
    //       <Button onClick={joinRoom} variant="contained">
    //         JOIN GAME
    //       </Button>
    //     </CardContent>
    //     <CardActions className="welcome--create-container">
    //       <Button onClick={createRoom} variant="contained">
    //         CREATE GAME
    //       </Button>
    //       {/* <StyledButton onClick={createRoom} placeholder="CREATE GAME" /> */}
    //     </CardActions>
    //   </CardContent>
    // </Card>
  );
}

export { JoinRoom };
