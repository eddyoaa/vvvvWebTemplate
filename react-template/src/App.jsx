import React, { useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import "./App.css";
import useGestureInterpreter from "./hooks/useGestureInterpreter";

const App = () => {
  //
  //
  // "state" for received data
  const [receivedData, setReceivedData] = useState("");

  //
  //
  // initiate webSocket client and open connection
  const socketUrl = "ws://localhost:5001";
  const { sendMessage, lastMessage } = useWebSocket(socketUrl, {});

  useWebSocket(socketUrl, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
  });

  //
  //
  // creating refs for web Interface Elements -> every element,
  // which should not trigger a message to vvvv gets it own ref
  const buttonRef = useRef(null);
  const dataRef = useRef(null);

  const refs = [buttonRef, dataRef];

  // here you can define what should happen on different gesture events.
  //type is a string with following values: "tap" , "pinch", "drag"
  const handleGesture = (e, type) => {
    let message = JSON.stringify({
      type: type,
      movement: e.movement,
    });
    sendMessage(message);
    console.log(message);
  };

  //we need to bind this listener to a html element. Depending on the use case,
  // you could bind it to "specific" parts of the screen or the whole screen
  const bind = useGestureInterpreter(handleGesture, refs);

  //
  //
  // handling a received Message here. Listening to changes of "lastMessage"
  // in this case we save it in our state and display it
  useEffect(() => {
    let receivedValue;
    if (lastMessage !== null) {
      console.log(lastMessage);
      receivedValue = JSON.parse(lastMessage.data);
      console.log(receivedValue);
      if (receivedValue.hasOwnProperty("test")) {
        setReceivedData(receivedValue.test);
      }
    }
  }, [lastMessage, sendMessage]);

  //
  //
  // handling click events by sending a string to vvvv
  const handleCLick = () => {
    let message = JSON.stringify({
      text: "Click",
    });
    sendMessage(message);
    console.log(message);
  };

  //
  //
  // design your web app here (what every your imagination is capable of :P)
  return (
    // binding the listener
    <div {...bind()} className="App">
      <button ref={buttonRef} onClick={handleCLick} className="button">
        Click me!
      </button>
      {/* Displaying the state */}
      <p ref={dataRef} className="data">
        {receivedData}
      </p>
    </div>
  );
};

export default App;
