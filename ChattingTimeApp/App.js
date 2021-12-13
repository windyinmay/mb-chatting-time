/*
console.ignoredLogBox = ["Remote debugger"];
import { LogBox, YellowBox } from "react-native";
YellowBox.ignoreAllLogs([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?",
]);
*/
import React from "react";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import Container from "./Container";

const socket = io("http://192.168.0.100:3030");
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

function reducer(state = { conversations: {} }, action) {
  switch (action.type) {
    case "members_online":
      const conversations = { ...state.conversations };
      const membersOnline = action.data;
      for (let i = 0; i < membersOnline.length; i++) {
        const memberId = membersOnline[i].memberId;
        if (conversations[memberId] === undefined) {
          conversations[memberId] = {
            messages: [],
            username: membersOnline[i].username,
          };
        }
      }
      return { ...state, membersOnline, conversations };
    case "private_message":
      const conversationId = action.data.conversationId;
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...state.conversations[conversationId],
            messages: [
              action.data.message,
              ...state.conversations[conversationId].messages,
            ],
          },
        },
      };
    case "self_member":
      return { ...state, selfMember: action.data };
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
