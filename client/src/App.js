import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { Game } from "./components/tmp/Game";
// import { Homepage } from "./components/Homepage";

import { Welcome } from "./components/Welcome";
import { Game } from "./components/tmp/Game";
import { Homepage } from "./components/tmp/Homepage";
import { Room } from "./components/Room";
import { WaitRoom } from "./components/WaitRoom";
import { NotFound } from "./views/NotFound";
import { Header } from "./components/Header";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header room={"Home"}></Header>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/play" element={<Game />} />
          {/* No usar estos de aca */}
          {/* <Route path="/waitRoom" element={<WaitRoom />} /> */}
          {/* <Route path="/" element={<Welcome redirectTo="game" />} /> */}
          {/* <Route path="/room" element={<Room />} /> */}
          {/* <Route path="/" element={<Homepage />} />*/}
          {/*<Route path="/game" element={<Game />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export { App };
