const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for messages from the client
  socket.on("message", (message) => {
    console.log(message);
  });

  // Send a message to the client
  socket.emit("message", "Hello from the server!");
});

http.listen(3000, () => {
  console.log("Socket.IO server listening on port 3000");
});
