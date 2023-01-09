import "./App.css";
import "./Game.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { Game } from "./components/tmp/Game";
// import { Homepage } from "./components/Homepage";

import { Room } from "./views/Room";
import { Theme } from "./config/Theme";
import { Header } from "./components/Header";
import { Welcome } from "./views/Welcome";
import { NotFound } from "./views/NotFound";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";

const App = () => {
  const [roomCode, setRoomCode] = React.useState("");
  // const location = useLocation();

  useEffect(() => {
    // document.addEventListener("keydown", event => {
    //   console.log(location.pathname);
    //   if (location.pathname === "/") {
    //     if (event.key === "Enter") {
    //       if (roomCode === "") alert("Please, insert a room code");
    //       else joinRoom();
    //     }
    //   }
    // });
    const tmpCode = localStorage.getItem("pact-game.roomCode");

    if (tmpCode !== "") {
      setRoomCode(tmpCode);
    }
  }, []);

  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        <BrowserRouter>
          <Header room={"Home"}></Header>
          <Routes>
            {/* <Route path="/" element={<Homepage />} /> */}
            {/* <Route path="/play" element={<Game />} /> */}
            {/* No usar estos de aca */}
            <Route
              path="/"
              element={
                <Welcome
                  images={{ show: true, image: "trial" }}
                  redirectTo="room"
                />
              }
            />
            <Route path="/room" element={<Room code={roomCode} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export { App };
