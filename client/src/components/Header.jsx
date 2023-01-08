import React, { useState } from "react";
import Button from "@mui/material/Button";
import useSound from "use-sound";
import bgMusic from "../assets/sounds/game-bg-music.mp3";

function Header({ room, showButtons }) {
  const [isSoundMuted, setSoundMuted] = useState(false);
  const [isMusicMuted, setMusicMuted] = useState(true);
  const [playBBgMusic, { pause }] = useSound(bgMusic, { loop: true });

  return (
    <div className="w-100 pt-2 row align-items-center justify-content-around">
      <div className="col-2 text-center w-25">
        <img alt="Logo" className="w-100" id="logo" src="assets/logo.png" />
      </div>
      <div className="col-4 text-center align-items-center">
        <h1>
          <span className="h1">
            <strong>{room}</strong>
          </span>
        </h1>
      </div>

      <div className="col-6 justify-content-evenly w-25">
        <div className="row my-1">
          <Button
            variant="contained"
            onClick={() => setSoundMuted(!isSoundMuted)}
          >
            {isSoundMuted ? (
              <span className="material-icons">volume_off</span>
            ) : (
              <span className="material-icons">volume_up</span>
            )}
          </Button>
        </div>
        <div className="row my-1">
          <Button
            variant="contained"
            onClick={() => {
              if (isMusicMuted) playBBgMusic();
              else pause();
              setMusicMuted(!isMusicMuted);
            }}
          >
            {isMusicMuted ? (
              <span className="material-icons">music_off</span>
            ) : (
              <span className="material-icons">music_note</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export { Header };
