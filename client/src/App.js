import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { Game } from "./components/tmp/Game";
// import { Homepage } from "./components/Homepage";

import { Welcome } from "./components/Welcome";
import { Game } from "./components/Game";
import { Room } from "./components/Room";
import { WaitRoom } from "./components/WaitRoom";
import { NotFound } from "./views/NotFound";
import { Header } from "./components/Header";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header room={"Home"} ></Header>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/waitRoom" element={<WaitRoom />} />
          <Route path="/room" element={<Room />} /> */
          <Route path="*" element={<NotFound />} />
          {/* <Route path="/game" element={<Game />} />
          {/* <Route path="/" element={<Homepage />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export { App };
