/*
console.ignoredLogBox = ["Remote debugger"];
import { LogBox, YellowBox } from "react-native";
YellowBox.ignoreAllLogs([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?",
]);
*/
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import React from "react";
import Container from "./Container";
const socket = io("http://192.168.0.101:3030");
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

function reducer(state = {}, action) {
  switch (action.type) {
    case "message":
      return { ...state, message: action.data };
    default:
      return state;
  }
}
//state {} => initial state with an empty object, action -> use to emit event ex: change the state inside the app

//create the store contains the states of the app
const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer);

store.subscribe(() => {
  console.log("new state", store.getState());
});
//now dispatching an action
store.dispatch({ type: "server/index", data: "Hello Developers!" });
export default function App() {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
}
