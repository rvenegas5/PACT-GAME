import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { Game } from "./components/tmp/Game";
// import { Homepage } from "./components/Homepage";

import { Room } from "./views/Room";
import { Theme } from "./config/Theme";
import { Header } from "./components/Header";
import { Welcome } from "./views/Welcome";
import { NotFound } from "./views/NotFound";
import { ThemeProvider } from "@mui/system";

const App = () => {
  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        <BrowserRouter>
          <Header room={"Home"}></Header>
          <Routes>
            {/* <Route path="/" element={<Homepage />} /> */}
            {/* <Route path="/play" element={<Game />} /> */}
            {/* No usar estos de aca */}
            <Route path="/" element={<Welcome redirectTo="room" />} />
            <Route path="/room" element={<Room />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export { App };
