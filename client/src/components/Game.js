import React, { useEffect, useState } from "react";
// import PACK_OF_CARDS from "../../utils/packOfCards";
// import shuffleArray from "../../utils/shuffleArray";
import io from "socket.io-client";
import useSound from "use-sound";

import bgMusic from "../assets/sounds/game-bg-music.mp3";
import unoSound from "../assets/sounds/uno-sound.mp3";
import shufflingSound from "../assets/sounds/shuffling-cards-1.mp3";
import skipCardSound from "../assets/sounds/skip-sound.mp3";
import draw2CardSound from "../assets/sounds/draw2-sound.mp3";
import wildCardSound from "../assets/sounds/wild-sound.mp3";
import draw4CardSound from "../assets/sounds/draw4-sound.mp3";
import gameOverSound from "../assets/sounds/game-over-sound.mp3";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";

//NUMBER CODES FOR ACTION CARDS
//SKIP - 404
//DRAW 2 - 252
//WILD - 300
//DRAW 4 WILD - 600

let socket;
// Dev Endpoint
const ENDPOINT = "http://localhost:80";
//const ENDPOINT = 'https://testapplication1.ngrok.io'
//const ENDPOINT = 'https://uno-online-multiplayer.herokuapp.com/'

const Game = props => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  //initialize socket state
  const [room, setRoom] = useState(searchParams.get("code"));
  const [roomFull, setRoomFull] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const connectionOptions = {
      forceNew: true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"]
    };
    socket = io.connect(ENDPOINT, connectionOptions);

    socket.emit("join", { room: room }, error => {
      if (error) setRoomFull(true);
    });

    //cleanup on component unmount
    return function cleanup() {
      socket.emit("logOut");
      //shut down connnection instance
      socket.off();
    };
  }, []);

  //initialize game state
  const [gameOver, setGameOver] = useState(true);
  const [winner, setWinner] = useState("");
  const [turn, setTurn] = useState("");
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [player2Deck, setPlayer2Deck] = useState([]);
  const [currentColor, setCurrentColor] = useState("");
  const [currentNumber, setCurrentNumber] = useState("");
  const [playedCardsPile, setPlayedCardsPile] = useState([]);
  const [drawCardPile, setDrawCardPile] = useState([]);

  const [isChatBoxHidden, setChatBoxHidden] = useState(true);
  const [isUnoButtonPressed, setUnoButtonPressed] = useState(false);
  const [isSoundMuted, setSoundMuted] = useState(false);
  const [isMusicMuted, setMusicMuted] = useState(true);

  const [playBBgMusic, { pause }] = useSound(bgMusic, { loop: true });
  const [playUnoSound] = useSound(unoSound);
  const [playShufflingSound] = useSound(shufflingSound);
  const [playSkipCardSound] = useSound(skipCardSound);
  const [playDraw2CardSound] = useSound(draw2CardSound);
  const [playWildCardSound] = useSound(wildCardSound);
  const [playDraw4CardSound] = useSound(draw4CardSound);
  const [playGameOverSound] = useSound(gameOverSound);

  //runs once on component mount
  useEffect(() => {
    //shuffle PACK_OF_CARDS array
    // const shuffledCards = shuffleArray(PACK_OF_CARDS);

    //extract first 7 elements to player1Deck
    // const player1Deck = shuffledCards.splice(0, 7);

    //extract first 7 elements to player2Deck
    // const player2Deck = shuffledCards.splice(0, 7);

    // //extract random card from shuffledCards and check if its not an action card
    // let startingCardIndex;
    // while (true) {
    //   startingCardIndex = Math.floor(Math.random() * 94);
    //   if (
    //     shuffledCards[startingCardIndex] === "skipR" ||
    //     shuffledCards[startingCardIndex] === "_R" ||
    //     shuffledCards[startingCardIndex] === "D2R" ||
    //     shuffledCards[startingCardIndex] === "skipG" ||
    //     shuffledCards[startingCardIndex] === "_G" ||
    //     shuffledCards[startingCardIndex] === "D2G" ||
    //     shuffledCards[startingCardIndex] === "skipB" ||
    //     shuffledCards[startingCardIndex] === "_B" ||
    //     shuffledCards[startingCardIndex] === "D2B" ||
    //     shuffledCards[startingCardIndex] === "skipY" ||
    //     shuffledCards[startingCardIndex] === "_Y" ||
    //     shuffledCards[startingCardIndex] === "D2Y" ||
    //     shuffledCards[startingCardIndex] === "W" ||
    //     shuffledCards[startingCardIndex] === "D4W"
    //   ) {
    //     continue;
    //   } else break;
    // }

    //extract the card from that startingCardIndex into the playedCardsPile
    // const playedCardsPile = shuffledCards.splice(startingCardIndex, 1);

    // //store all remaining cards into drawCardPile
    // const drawCardPile = shuffledCards;

    //send initial state to server
    socket.emit("initGameState", {
      gameOver: false,
      turn: "Player 1"
    });
  }, []);

  useEffect(() => {
    socket.on("initGameState", ({ gameOver, turn }) => {
      setGameOver(gameOver);
      setTurn(turn);
    });

    socket.on("updateGameState", ({ gameOver, winner, turn }) => {
      gameOver && setGameOver(gameOver);
      gameOver === true && playGameOverSound();
      winner && setWinner(winner);
      turn && setTurn(turn);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    socket.on("currentUserData", ({ name }) => {
      setCurrentUser(name);
    });

    socket.on("message", message => {
      setMessages(messages => [...messages, message]);

      const chatBody = document.querySelector(".chat-body");
      chatBody.scrollTop = chatBody.scrollHeight;
    });
  }, []);

  const quit = () => {
    navigate(-1);
  };

  return (
    <div className="container text-center">
      {!roomFull ? (
        {/* <Header
          room={room}
          isSoundMuted={isSoundMuted}
          setSoundMuted={setSoundMuted}
          isMusicMuted={isMusicMuted}
          setMusicMuted={setMusicMuted}
        ></Header> */}
      ) : (
        <div className="container text-center">
          <div className="row align-items-center">
            <div className="row">
              <h1>THE ROOM IS FULL</h1>
            </div>
            <div className="row">
              <Button onClick={quit} variant="contained">
                QUIT
              </Button>
            </div>
          </div>
        </div>
      )}

      <br />
    </div>
  );
};

export { Game };
