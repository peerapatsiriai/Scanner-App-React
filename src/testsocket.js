import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const App = () => {
  const [input, setInput] = useState('');
  const [message, setMessage] = useState([]);
  const endpoint = "http://localhost:9000";

  // useEffect to set up the socket connection and event listeners
  useEffect(() => {
    const socket = socketIOClient(endpoint);

    // Function to handle incoming new messages
    const handleNewMessage = (messageNew) => {
      console.log(messageNew);
      setMessage((prevMessage) => [...prevMessage, messageNew]);
    };

    // Listen for 'new-message' event from the server
    socket.on('new-message', handleNewMessage);

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.off('new-message', handleNewMessage);
      socket.disconnect();
    };
  }, []);

  // Function to handle sending messages to the server
  const send = () => {
    const socket = socketIOClient(endpoint);
    socket.emit('sent-message', input);
    setInput('');
  };

  // Function to handle input changes
  const changeInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <div style={style}>
        <input value={input} onChange={changeInput} />
        <button onClick={send}>Send</button>
      </div>
      {message.map((data, i) => (
        <div key={i} style={style}>
          {i + 1} : {data}
        </div>
      ))}
    </div>
  );
};

const style = { marginTop: 20, paddingLeft: 50 };

export default App;
