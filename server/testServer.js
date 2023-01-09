
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

const maxUsers = 4;
app.use(cors());

const playerNames = ["Player 1", "Player 2", "Player 3", "Player 4"];
let identificadorIntervaloDeTiempo;



io.on("connection", (socket) => {
  let cont=0
  socket.on("join", (payload, callback) => {
    function repetirCadaSegundo() {
      identificadorIntervaloDeTiempo = setInterval(aumentarContador, 1000);
    }
    
    function aumentarContador() {
      cont++
      console.log("Ha pasado ",cont," segundo.");
      if(cont==10) {
        console.log("Tiempo agotado")
        socket.to(payload.room).emit("tiempoAgotado",()=>{
          //alert("termino tiempo")
        })
        //alert("iempo termindao ")
        cont=0 
      }
      //socket.to(payload.room).emit("tiempoEnd");
    }
    console.log("New connection in:", payload.room);
    let numberOfUsersInRoom = getUsersInRoom(payload.room).length;
    console.log("  Current players", numberOfUsersInRoom+1);

    socket.on("comenzarTiempo",()=>{
      repetirCadaSegundo() 
    })
    //if(numberOfUsersInRoom+1==maxUsers) repetirCadaSegundo()

    if (numberOfUsersInRoom+1 > maxUsers) {
      console.log(">>> its full");
      socket.to(payload.room).emit("roomFull");
    } else {
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
    }
    if (numberOfUsersInRoom === maxUsers) {
      socket.emit("initGame", { initGame: true });
    }
  }); 

  socket.join("test", (payload) => {
    console.log(socket.id)
    console.log("test", payload);
  });



  socket.on("logOut", () => {
    const user = removeUser(socket.id);
    console.log("logOut", user);
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
