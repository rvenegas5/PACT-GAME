import React, { useState } from 'react'

function Chat() {

    const [isChatBoxHidden, setChatBoxHidden] = useState(true);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("message", message => {
            setMessages(messages => [...messages, message]);

            const chatBody = document.querySelector(".chat-body");
            chatBody.scrollTop = chatBody.scrollHeight;
        });
    }, []);

    const toggleChatBox = () => {
        const chatBody = document.querySelector(".chat-body");
        if (isChatBoxHidden) {
            chatBody.style.display = "block";
            setChatBoxHidden(false);
        } else {
            chatBody.style.display = "none";
            setChatBoxHidden(true);
        }
    };

    const sendMessage = event => {
        event.preventDefault();
        if (message) {
            socket.emit("sendMessage", { message: message }, () => {
                setMessage("");
            });
        }
    };

    return (
        <div className="chatBoxWrapper">
            <div className="chat-box chat-box-player1">
                <div className="chat-head">
                    <h2>Chat</h2>
                    {!isChatBoxHidden ? (
                        <span
                            onClick={toggleChatBox}
                            class="material-icons"
                        >
                            keyboard_arrow_down
                        </span>
                    ) : (
                        <span
                            onClick={toggleChatBox}
                            class="material-icons"
                        >
                            keyboard_arrow_up
                        </span>
                    )}
                </div>
                <div className="chat-body">
                    <div className="msg-insert">
                        {messages.map(msg => {
                            if (msg.user === "Player 2")
                                return (
                                    <div className="msg-receive">
                                        {msg.text}
                                    </div>
                                );
                            if (msg.user === "Player 1")
                                return (
                                    <div className="msg-send">{msg.text}</div>
                                );
                        })}
                    </div>
                    <div className="chat-text">
                        <input
                            type="text"
                            placeholder="Escribe un mensaje..."
                            value={message}
                            onChange={event =>
                                setMessage(event.target.value)
                            }
                            onKeyPress={event =>
                                event.key === "Enter" && sendMessage(event)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;