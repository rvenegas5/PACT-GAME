import React from "react";
import { Button, Modal , Box} from "@mui/material";
import { style} from "../../config/Constants";


const ModalFeed = ({setOpenFeed,option,setOpenCard,setCurrentCard})=> {

    
    const handleClose = () => {
        setOpenFeed(false);
        setOpenCard(false);
        setCurrentCard([]);

    }
    
    return(
        <Modal open={setOpenFeed} onClose={handleClose}>
            <Box sx={style}>
                 <div className="d-flex flex-column align-items-center m-2">
                           
                    {option ?
                            <>
                                <span className="message-modal">Felicidades ha acertado en la respuesta</span>
                                
                                <img className='' src={require("../../assets/icons/plus2.png")}
                                style={{ width: "15vw", height: "26vh" }} alt='especial'></img>
                            </>
                    :
                            <>
                                <h4 className="message-modal">¡Opps!</h4>
                            
                                    <p className="message-modal">Haz seleccionado una respuesta incorrecta</p>
                                    <img className='' src={require("../../assets/icons/sadface2.png")}
                                    style={{ width: "10vw", height: "20vh" }} alt='especial'></img>
                            
                            </>

                    }          
                </div>

 
            </Box>

        </Modal>
    )



}

export default ModalFeed;