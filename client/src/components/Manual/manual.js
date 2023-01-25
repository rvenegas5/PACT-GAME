import { Box, Modal, ListItemText, Divider } from "@mui/material";
import React, { useState } from "react";
import { manual, reglas } from "../../config/Constants";

function Manual({
  modal: { openTutorial, setOpenTutorial },
  handleCloseTutorial
}) {
  const handleCloseManual = () => setOpenTutorial(false);

  return (
    <React.Fragment>
      <button className="homepage-button" onClick={handleCloseTutorial}>
        Manual del Juego
      </button>
      {openTutorial && (
        <Modal open={setOpenTutorial} onClose={handleCloseManual}>
          <Box sx={manual}>
            <div className="d-flex flex-row ">
              <div className="d-flex flex-column justify-content-around ml-2 mr-2">
                <img
                  src={require("../../assets/logo.png")}
                  alt="logo2"
                  className="img-fluid"
                />
                <h4> Objetivos del Juego</h4>
                <span>
                  Acumular la mayor cantidad de puntos adivinando cual será la
                  respuesta del jurado ante la situación relacionada al maltrato
                  o abandono animal.
                </span>
              </div>
              <Divider
                orientation="vertical"
                sx={{ bgcolor: "secondary.light", margin: "8px" }}
                flexItem
              />
              <div>
                {Object.keys(reglas).map((key, i) => (
                  <>
                    <div className="option">
                      <span>{key}</span>
                      <ListItemText> {reglas[key]}</ListItemText>
                    </div>
                    <br />
                  </>
                ))}
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </React.Fragment>
  );
}

export { Manual };
