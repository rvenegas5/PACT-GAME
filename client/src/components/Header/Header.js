import React , { useState } from 'react'
import useSound from 'use-sound'
import bgMusic from '../../assets/sounds/game-bg-music.mp3'
import "./Header.css"


const Header = () => {
    const [isSoundMuted, setSoundMuted] = useState(false);
    const [isMusicMuted, setMusicMuted] = useState(true);
    const [playBBgMusic, { pause }] = useSound(bgMusic, { loop: true })

    return (
      
        <div className="Header">
        <img className='header-icon' src={require('../../assets/logo2.png')} alt='logo'/>
        <div className=''>
          <h4 className='header-name'> PAWS AND CLAWS TRIAL</h4>
        </div>
       
        <span>
        {/* <button className='music-button green' onClick={() => setSoundMuted(!isSoundMuted)}>
          {isSoundMuted ? <span className="material-icons">volume_off</span> : <span className="material-icons">volume_up</span>}
        </button> */}
        <button className='music-button green' onClick={() => {
            if(isMusicMuted)
                playBBgMusic()
            else
                pause()
            setMusicMuted(!isMusicMuted)
        }}>{isMusicMuted ? <span className="material-icons">music_off</span> : <span className="material-icons">music_note</span>}</button>
    </span>
        
      </div>
      
    )
  }
  
  export default Header;
  