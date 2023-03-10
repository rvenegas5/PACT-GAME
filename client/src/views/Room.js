import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Modal, Box, Avatar } from "@mui/material";
import { WaitRoom2 } from "../components/WaitRoom2";
import {
  maxPlayers,
  ENDPOINT,
  connectionOptions,
  avatar
} from "../config/Constants";
import io from "socket.io-client";
import { all } from "../utils/cards";
import shuffleArray from "../utils/shuffleArray";
import ModalCard from "./ModalCard";
import { User } from "../interface/user";
import { AvatarBubble } from "../components/Avatar/AvatarBubble";
import { avatar1, avatar2, avatar3, avatar4 } from "../config/Avatars";
import { Chat } from "../components/Chat/Chat";

// Constants
let socket;

// Cambiar rol de acusado dinamicamente
const getAcusado = (players, currentAcusado) => {
  if (players[players.length - 1] === currentAcusado) return players[0];
  else {
    for (let i = 0; i < players.length - 1; i++) {
      if (players[i] === currentAcusado) {
        return players[i + 1];
      }
    }
  }
};

const Room = () => {
  const navigate = useNavigate();

  const room = localStorage.getItem("pact-game.roomCode");
  const [roomFull, setRoomFull] = useState(false);
  const [user, setUser] = useState({});
  const [players, setPlayers] = useState([{}]);
  const [normalCards, setNormalCards] = useState(shuffleArray(all));
  const [currentCard, setCurrentCard] = useState([]);
  const [openCard, setOpenCard] = useState(false);
  const [closeCard, setCloseCard] = useState(false);
  const [currentAcusado, setCurrentAcusado] = useState({});
  const userName = localStorage.getItem("pact-game.userName");
  let player1;
  let player2;
  let player3;
  let player4;

  // Initialize socket
  useEffect(() => {
    console.log(players);
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
      let tmp = [];
      data.users.forEach(user => {
        tmp.push(new User(user));
      });

      setPlayers(tmp);
      localStorage.setItem("pact-game.players", JSON.stringify(tmp));
      if (data.users.length === maxPlayers) setRoomFull(true);      
    });
    socket.on("currentUserData", ({ data }) => {
      console.log("currentUserData", new User(data));
      // localStorage.setItem(`pact-game.user_${data.id}`, JSON.stringify(data));
      localStorage.setItem(`pact-game.user`, JSON.stringify(new User(data)));
      sessionStorage.setItem(`pact-game.user`, JSON.stringify(new User(data)));
      setUser(new User(data));
    });
  }, []);

  useEffect(() => {
    //Logica para redirigir a la ventana principal porque ya esta la sala llena
    if (roomFull) {
      initGame();
      console.log("sala llena , comenzar juego");
      console.log(JSON.parse(localStorage.getItem("pact-game.players")));
      socket.emit("comenzarTiempo", () => {
        console.log("Empez?? a contar... ");
      });

      socket.on("tiempoAgotado", () => {
        console.log("termin?? juego");
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

  const initGame = () => {
    let currentAcusado = players[0];
    setCurrentAcusado(currentAcusado);
    player1 = players[0];
    player2 = players[1];
    player3 = players[2];
    player4 = players[3];

    console.log("initGame", players);
  };





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
        <>
        <div>
          <div className="player-top-left">
            <AvatarBubble
              game={{ currentAcusado, player1 }}
              avatarPath={avatar1}
              message={JSON.parse(localStorage.getItem("pact-game.players"))[0].name}
            />
          </div>
          <div className="player-top-right">
            <AvatarBubble
              game={{ currentAcusado, player2 }}
              avatarPath={avatar2}
              message={JSON.parse(localStorage.getItem("pact-game.players"))[1].name}
            />
          </div>
          <div className="player-bottom-left">
            <AvatarBubble
              game={{ currentAcusado, player3 }}
              avatarPath={avatar3}
              message={JSON.parse(localStorage.getItem("pact-game.players"))[2].name}
            />
          </div>
          <div className="player-bottom-right">
            <AvatarBubble
              game={{ currentAcusado, player4 }}
              avatarPath={avatar4}
              message={JSON.parse(localStorage.getItem("pact-game.players"))[3].name}
            />
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
        <Chat socket={{socket}}/>
        
        </>
      )}
    </Container>
  );
};

export { Room };
