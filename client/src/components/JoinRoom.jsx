import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container
} from "@mui/material";
import { generateRandomPath } from "../utils/generateRandomPath";
function JoinRoom({
  room: { setRoomCode, joinRoom, createRoom },
  images: { show, image }
}) {
  const imagePath =
    image === "trial" ? "./assets/trial.png" : generateRandomPath();
  const showImages = show;

  return (
    <Container maxWidth="xs">
      <Card className="welcome">
        {showImages && (
          <CardContent className="welcome--image-container">
            <img
              className="img-tumbnail w-75"
              alt="Animal aleatorio"
              src={imagePath}
            />
          </CardContent>
        )}
        <CardContent className="welcome--room-container">
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
          <Button onClick={joinRoom} variant="contained">
            JOIN GAME
          </Button>
        </CardContent>
        <CardActions className="">
          <Button onClick={createRoom} variant="contained">
            CREATE GAME
          </Button>
          {/* <StyledButton onClick={createRoom} placeholder="CREATE GAME" /> */}
        </CardActions>
      </Card>
    </Container>
  );
}

export { JoinRoom };
