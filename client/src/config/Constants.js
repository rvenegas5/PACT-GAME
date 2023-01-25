const maxPlayers = 4;
const ENDPOINT = "http://localhost:80";
const connectionOptions = {
  forceNew: true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"]
};
const style = {
  position: "absolute",
  // justifyContent: 'space-evenly',
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  // width: 600,
  bgcolor: "background.paper",
  border: "1px solid ",
  borderRadius: 3,
  boxShadow: 24,
  p: 2,
  width: 350,
  height: 450,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
};

const center = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 2,
  width: 250,
  height: 350
};

const modal = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24
};

const manual = {
  position: "absolute",
  // justifyContent: 'space-evenly',
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  // width: 600,
  bgcolor: "background.paper",
  border: "1px solid ",
  borderRadius: 3,
  boxShadow: 24,
  p: 2,
  width: 750,
  height: 750
};

const modalCarta = {
  position: "absolute",
  // justifyContent: 'space-evenly',
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  // width: 600,
  bgcolor: "background.paper",
  border: "1px solid ",
  borderRadius: 3,
  boxShadow: 24,
  p: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "50vh",
  width: "fitcontent",
  height: "fitcontent",
  maxWidth: "80vw",
  maxHeight: "70vh"
};

const avatar = {
  width: 100,
  height: 100
};

const reglas = {
  1: "Se selecciona aleatoriamente al primer jugador que tomará el papel del acusado",
  2: "La persona tomará una carta de la baraja y leerá el caso.",
  3: "El jugador deberá seleccionar la respuesta que considere correcta",
  4: "Los demás participantes tomarán el papel de jurado y deliberarán cual es la opción correcta.",
  5: "Se anuncia cual es la respuesta seleccionada por el jurado.",
  6: "Si el jugador adivino correctamente , el acusado ganará un punto.",
  7: "Se escoge al siguiente acusado."
};

export {
  ENDPOINT,
  connectionOptions,
  maxPlayers,
  style,
  reglas,
  center,
  modal,
  manual,
  avatar,
  modalCarta
};
