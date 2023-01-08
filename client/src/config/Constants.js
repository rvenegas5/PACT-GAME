const maxPlayers = 4;
const ENDPOINT = "http://localhost:80";
const connectionOptions = {
  forceNew: true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"]
};

export { ENDPOINT, connectionOptions, maxPlayers };
