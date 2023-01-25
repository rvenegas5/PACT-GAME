import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Modal, Box } from "@mui/material";
import { WaitRoom2 } from "../components/WaitRoom2";
import { maxPlayers, ENDPOINT, connectionOptions } from "../config/Constants";
import io from "socket.io-client";
import { all } from "../utils/cards";
import shuffleArray from "../utils/shuffleArray";
import ModalCard from "./ModalCard";

// Constants
let socket;

// const saveCookie = (user, players) => {
//   if (user && players) updateCookie(user, players);
// };

const Room = () => {
  const navigate = useNavigate();

  const room = localStorage.getItem("pact-game.roomCode");
  const [roomFull, setRoomFull] = useState(false);
  const [user, setUser] = useState({});
  const [players, setPlayers] = useState([]);
  const [normalCards, setNormalCards] = useState(shuffleArray(all));
  const [currentCard, setCurrentCard] = useState([]);
  const [openCard, setOpenCard] = useState(false);
  const [closeCard, setCloseCard] = useState(false);

  const userName = localStorage.getItem("pact-game.userName");

  // Initialize socket
  useEffect(() => {
    if (players.length < maxPlayers) {
      socket = io.connect(ENDPOINT, connectionOptions);
      socket.emit("join", { room: room, name: userName }, error => {
        if (error) return error;
      });
    } else {
      quit();
    }
    return () => {
      socket.emit("logOut");
      socket.off();
    };
  }, []);
  useEffect(() => {
    socket.on("roomFull", () => {
      setRoomFull(true);
    });
    socket.on("roomData", data => {
      localStorage.setItem("pact-game.players", JSON.stringify(data.users));
      if (data.users.length === maxPlayers) setRoomFull(true);
      setPlayers(data.users);
    });
    socket.on("currentUserData", ({ data }) => {
      console.log("currentUserData", data);
      localStorage.setItem("pact-game.user", JSON.stringify(data));
      setUser(data);
    });
  }, []);

  useEffect(() => {
    //Logica para redirigir a la ventana principal porque ya esta la sala llena
    if (roomFull) {
      initGame();
      console.log("sala llena , comenzar juego");
      socket.emit("comenzarTiempo", () => {
        console.log("Empezó a contar... ");
      });

      socket.on("tiempoAgotado", () => {
        console.log("terminó juego");
      });
    }
  }, [roomFull]);

  const quit = () => {
    navigate("/");
  };
  const pickCard = event => {
    console.log(normalCards);
    const carta = normalCards.shift();
    currentCard.push(carta);
    console.log(carta.type);
    setOpenCard(true);
  };

  const initGame = () => {};
  return (
    <Container className="room" style={{ maxWidth: "40%" }}>
      {!roomFull && (
        <Container className="container text-center">
          <Container className="col align-items-center justify-content-center">
            {/* <WaitRoom room={room} quit={quit} /> */}
            <WaitRoom2 room={room} quit={quit} />
          </Container>
        </Container>
      )}
      {/* Display the game */}
      {roomFull && (
        <div>
          <div className="player-top-left">
            <div>
              <img
                src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurly&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=ShirtCrewNeck&clotheColor=Pink&eyeType=Default&eyebrowType=SadConcerned&mouthType=Grimace&skinColor=Light"
                className="avatar-img"
              />
            </div>
            <div>
              <span className="player-name">Player 1</span>
            </div>
          </div>
          <div className="player-top-right">
            <div>
              <img
                src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesarSidePart&accessoriesType=Prescription02&hairColor=Auburn&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=BlazerSweater&clotheColor=Heather&eyeType=Squint&eyebrowType=RaisedExcited&mouthType=Tongue&skinColor=Pale"
                className="avatar-img"
              />
            </div>
            <div>
              <span className="player-name">Player 2</span>
            </div>
          </div>
          <div className="player-bottom-left">
            <div>
              <img
                src="https://avataaars.io/?avatarStyle=Circle&topType=Eyepatch&accessoriesType=Blank&hairColor=Brown&facialHairType=BeardMajestic&facialHairColor=Black&clotheType=BlazerShirt&clotheColor=PastelBlue&eyeType=Default&eyebrowType=RaisedExcitedNatural&mouthType=Sad&skinColor=Yellow"
                className="avatar-img"
              />
            </div>
            <div>
              <span className="player-name">Player 3</span>
            </div>
          </div>
          <div className="player-bottom-right">
            <div>
              <img
                src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=Blue&facialHairType=MoustacheFancy&facialHairColor=Red&clotheType=Hoodie&clotheColor=PastelRed&eyeType=EyeRoll&eyebrowType=UpDownNatural&mouthType=Default&skinColor=Pale"
                className="avatar-img"
              />
            </div>
            <div>
              <span className="player-name">Player 4</span>
            </div>
          </div>
          <div className="table-game">
            {normalCards.length > 0 && (
              <>
                <img
                  className={"back-card"}
                  src={require("../assets/backCard.png")}
                  alt="normal"
                  onClick={e => pickCard(e)}
                />
                {/* <img src={require('../assets/backCard2.png')} alt='especial' onClick={(e) => pickCard(e)} /> */}
                {openCard && (
                  <ModalCard
                    setOpenCard={setOpenCard}
                    currentCard={currentCard[0]}
                    setCurrentCard={setCurrentCard}
                  />
                )}
              </>
            )}
          </div>
        </div>

        // <Container className="container text-center">
        //   <Container className="row align-items-center">
        //     <Container className="row">
        //       {/* <h1>
        //         THE ROOM IS FULL,
        //         <span className="display-6">{user.name}</span>
        //       </h1> */}

        //     </Container>
        //     <Container className="row">
        //       <Button onClick={quit} variant="contained">
        //         QUIT
        //       </Button>
        //     </Container>
        //   </Container>
        // </Container>
      )}
    </Container>
  );
};

export { Room };
