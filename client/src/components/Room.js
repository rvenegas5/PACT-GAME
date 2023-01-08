import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Cookies from "js-cookie";

// Server URL
const ENDPOINT = "http://localhost:80";

// Constants
let socket;
let maxPlayers = 3;

function Room(props) {
  const getCookies = value => {
    return Cookies.get(value);
  };

  const [user, setUser] = useState(getCookies("pact-game.user"));
  const [id, setId] = useState(getCookies("pact-game.id"));
  const [room, setRoom] = useState(getCookies("pact-game.roomCode"));
  // const [players, setPlayers] = useState(cookie.players);

  // Initialize
  useEffect(() => {
    console.log(user);
    // console.log(players);

    return function cleanup() {
      socket.emit("logOut");
      socket.off();
    };
  }, []);

  return (
    <div>
      <h1>Room: {room}</h1>
      <h2>You are {user.name}</h2>
      <h2>with code {user.id}</h2>
    </div>
  );
}

export { Room };
