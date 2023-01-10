import { Box, Modal ,Divider, useRadioGroup} from '@mui/material'
import React, { useState } from 'react'
import "../components/Header/Header.css"
import ModalWait from "../components/Modal"
import { style} from "../config/Constants";

const ModalCard = ({setOpenCard, currentCard,setCurrentCard}) => {

    const [openWait,setOpenWait] = useState(false);
    const [openSpecial,setOpenSpecial] = useState(true);
    const typeCard = currentCard.type == "especial";

    const handleWait = () => {
        setOpenWait(true);
        
    } 
    const handleClose = () => {
        setOpenCard(false);
        setCurrentCard([]);

    }
    

    return (
        <> 
            <Modal open={setOpenCard} onClose={handleClose}> 
                <Box sx={style}>
                    
                    {typeCard ?
                      
                        <img className='' src={require("../assets/specialCards"+currentCard.content)} 
                        style={{width:"13vw", height: "44vh"}} alt='especial'></img>
                    :
                    <div className="bodyCard">
                        <div className="content">
                            <p >{currentCard.content}</p>     
                        </div>
                        <Divider orientation="vertical" sx={{ bgcolor: "secondary.light" ,margin:"8px"}} flexItem />
                        <div className="options">
                            {Object.keys(currentCard.options).map((key, i) => (
                                <>
                                    <div className="option">
                                        <button className='border-radius: 50%;' key={i} onClick={handleWait}>{key}</button>
                                        <span> {currentCard.options[key]}</span>
                                        
                                    </div>
                                    <br/>
                                </>
                                    
                                
                            ))}
                        
                        </div>
                    </div>
                    
                    }
                </Box>
            </Modal> 
            {openWait && <ModalWait openWait={openWait}></ModalWait>}
        </>
    
    )
    

}

export default ModalCard;