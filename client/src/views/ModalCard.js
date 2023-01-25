import { Box, Modal, Divider, useRadioGroup } from "@mui/material";
import React, { useState } from "react";
import "../components/Header/Header.css";
import ModalWait from "../components/Modal";
import ModalFeed from "../components/Modals/ModalFeed";
import { style } from "../config/Constants";
import { generateRandomPath } from "../utils/generateRandomPath";
import QuestionAnswerTwoToneIcon from "@mui/icons-material/QuestionAnswerTwoTone";

const ModalCard = ({ setOpenCard, currentCard, setCurrentCard }) => {
  const [openWait, setOpenWait] = useState(false);
  const [openFeed, setOpenFeed] = useState(false);
  const typeCardSpecial = currentCard.type === "especial";
  const typeCardKnow = currentCard.type === "knowledge";

  const [validateAnswer, setValidateAnswer] = useState(false);

  const handleWait = selectedAnswer => {
    if (currentCard.type === "normal") {
      setOpenWait(true);
    } else if (typeCardKnow) {
      let validate = currentCard.answer === selectedAnswer;
      setValidateAnswer(validate);
      setOpenFeed(true);
    }
  };
  const handleClose = () => {
    setOpenCard(false);
    setCurrentCard([]);
  };

  return (
    <>
      <Modal open={setOpenCard} onClose={handleClose}>
        <Box sx={style}>
          {typeCardSpecial ? (
            <img
              className=""
              src={require("../assets/specialCards" + currentCard.content)}
              style={{ width: "13vw", height: "44vh" }}
              alt="especial"
            ></img>
          ) : (
            <>
              <>
                {typeCardKnow ? (
                  <h5 className="message-modal">
                    Carta de Conocimiento <QuestionAnswerTwoToneIcon />
                  </h5>
                ) : (
                  <h5 className="message-modal">Carta de Situación </h5>
                )}

                <Divider
                  sx={{ bgcolor: "secondary.light", margin: "8px" }}
                  flexItem
                />
              </>
              <div className="bodyCard">
                <Divider
                  sx={{ bgcolor: "secondary.light", margin: "8px" }}
                  flexItem
                />
                <div className="content">
                  <p>{currentCard.content}</p>
                </div>
                <Divider
                  orientation="vertical"
                  sx={{ bgcolor: "secondary.light", margin: "8px" }}
                  flexItem
                />
                <div className="options">
                  {Object.keys(currentCard.options).map((key, i) => (
                    <>
                      <div className="option">
                        <button
                          className="border-radius: 50%;"
                          key={i}
                          onClick={() => handleWait(key)}
                        >
                          {key}
                        </button>
                        <span> {currentCard.options[key]}</span>
                      </div>
                      <br />
                    </>
                  ))}
                </div>
              </div>
            </>
          )}
        </Box>
      </Modal>
      {openWait && <ModalWait openWait={openWait}></ModalWait>}
      {openFeed && (
        <ModalFeed
          setOpenFeed={setOpenFeed}
          option={validateAnswer}
          setOpenCard={setOpenCard}
          setCurrentCard={setCurrentCard}
        ></ModalFeed>
      )}
    </>
  );
};

export default ModalCard;
