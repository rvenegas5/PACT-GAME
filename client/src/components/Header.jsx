import React, { useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import useSound from "use-sound";
import bgMusic from "../assets/sounds/game-bg-music.mp3";


function Header({ room, showButtons }) {
  const [isSoundMuted, setSoundMuted] = useState(false);
  const [isMusicMuted, setMusicMuted] = useState(true);
  const [playBBgMusic, { pause }] = useSound(bgMusic, { loop: true });

  return (
    <Container>
      <div className="header">
        <div className="header--img-container">
          <img className='header-icon' src={require('../assets/logo2.png')} alt='logo'/>
        </div>
        <div className="header--room-container">
          <h1>
            <span className="h1">
              <strong>{room}</strong>
            </span>
          </h1>
        </div>

        <div className="header--buttons-container">
          <Button
            className="header--button"
            variant="contained"
            onClick={() => setSoundMuted(!isSoundMuted)}
          >
            {isSoundMuted ? (
              <span className="material-icons">volume_off</span>
            ) : (
              <span className="material-icons">volume_up</span>
            )}
          </Button>
          <Button
            className="header--button"
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
    </Container>
  );
}

export { Header };
