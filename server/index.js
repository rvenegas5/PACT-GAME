const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const path = require("path");

const PORT = process.env.PORT || 80;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const maxUsers = 3;
app.use(cors());

const playerNames = ["Player 1", "Player 2", "Player 3", "Player 4"];

io.on("connection", (socket) => {
  socket.on("join", (payload, callback) => {
    console.log("New connection in:", payload.room);
    let numberOfUsersInRoom = getUsersInRoom(payload.room).length;
    console.log("  Current players", numberOfUsersInRoom);

    if (numberOfUsersInRoom > maxUsers) {
      console.log(">>> its full");
      socket.emit("roomFull");
    }
    if (numberOfUsersInRoom === maxUsers) {
      socket.emit("initGame", { initGame: true });
    }

    const { error, newUser } = addUser({
      id: socket.id,
      name: playerNames[numberOfUsersInRoom],
      room: payload.room,
    });

    console.log("  New user:", newUser);

    if (error) return callback(error);

    socket.join(newUser.room);

    io.to(newUser.room).emit("roomData", {
      room: newUser.room,
      users: getUsersInRoom(newUser.room),
    });
    socket.emit("currentUserData", { data: newUser });
    callback();
  });

  socket.on("logOut", () => {
    const user = removeUser(socket.id);
    if (user)
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    console.log("log out room", socket.id);
  });
});

//serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
