import React, { useEffect, useState, useRef } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { StyleSheet, Text, View, TextInput } from "react-native";
import io from "socket.io-client";

export default function HomeScreen() {
  const [msgToSend, setMsgToSend] = useState("");
  const [recMsg, setRecMsg] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    //find the local address by ifconfig
    socket.current = io("http://192.168.0.101:3030");
    console.log("Applying effect .....");
    //set up the listener
    //"" and variable are the same
    socket.current.on("msg", (msg) => {
      //one sending hello, hello abc = prevState, then new msg = hello xyz is pushed to the array
      setRecMsg((prevState) => [...prevState, msg]);
    });
    setRecMsg([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);
  /*<Text>{textOfRecMsg}</Text>*/
  const sendMsg = () => {
    //client side
    //eventEmitter which means emit events on one side and register listeners on the other
    socket.current.emit("message", msgToSend);
    setMsgToSend("");
  };

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={recMsg}
        // onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
       {
      Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
   }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
