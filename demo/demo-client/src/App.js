import React from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";

const room = 12;

// Initialize the Socket.IO client
const socket = io("http://localhost:3000");

// Use the socket connection in your component
class App extends React.Component {
  componentDidMount() {
    // Send a message to the Socket.IO server
    socket.emit("message", "Hello from the client!");

    // Listen for messages from the Socket.IO server
    socket.on("message", (message) => {
      console.log(message);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>{room}</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;
