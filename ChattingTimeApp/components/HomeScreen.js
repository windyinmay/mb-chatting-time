import React, { useEffect, useState, useRef } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import io from "socket.io-client";
import SignIn from "./SignIn";

export default function HomeScreen() {
  const [recMsg, setRecMsg] = useState([]);
  const [newbie, setNewBie] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    //find the local address by ifconfig
    socket.current = io("http://192.168.0.101:3030");
    console.log("Applying effect .....");
    //set up the listener
    //"" and variable are the same
    socket.current.on("message", (message) => {
      //27 Nov Github is experiencing degraded availability, could not check why test msg does not show
      //check later 4.12
      //const testMsg = {
      // _id: 3,
      // text: "Hello HH students!",
      // createdAt: new Date(),
      // user: {
      //   _id: 2,
      //  name: "React Native",
      //   avatar: "https://placeimg.com/140/140/any",
      //  },
      // };
      // testMsg.text = message;
      //one sending hello, hello abc = prevState, then new msg = hello xyz is pushed to the array
      // following https://github.com/FaridSafi/react-native-gifted-chat
      setRecMsg((prevState) => GiftedChat.append(prevState, message));
    });
  }, []);
  /*<Text>{textOfRecMsg}</Text>*/
  const onSend = (messages) => {
    console.log(messages);
    //client side
    //eventEmitter which means emit events on one side and register listeners on the other
    //need to connect to the socket to handle id to avoid a client could send bogus data to all other clients
    socket.current.emit("message", messages[0].text);
    //create blue bubble
    setRecMsg((prevState) => GiftedChat.append(prevState, messages));
  };

  const joinToChat = (username) => {
    socket.current.emit("newbie", username);
    setNewBie(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderUsernameOnMessage
        messages={recMsg}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />

      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
      <KeyboardAvoidingView behavior="padding" />
    </View>
    //since the keyboard hide the chat screen=> need keyboard avoiding fro android
  );
}
