import React from "react";
import { Button, Modal, Box } from "@mui/material";
import { style } from "../config/Constants";
import { Loading } from "./Loading";
const ModalWait = ({ openWait }) => {
  return (
    <Modal open={openWait}>
      <Box sx={style}>
        <span className="message-modal">
          Espere mientras el Jurado delibera
        </span>
        <br />
        <div className="d-flex justify-content-center m-2">
          <Loading></Loading>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalWait;
