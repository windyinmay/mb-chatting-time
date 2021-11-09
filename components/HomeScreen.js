import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import io from "socket.io-client";

export default function App() {
  const [msgToSend, setMsgToSend] = useState("");
  const [recvMsg, setRecvMsg] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://192.168.0.101:3030");
    console.log("Applying effect .....");
    socket.current.on("message", (message) => {
      setRecvMsg((prevState) => [...prevState, message]);
    });
  }, []);

  const sendMsg = () => {
    socket.current.emit("message", msgToSend);
    setMsgToSend("");
  };

  const textOfRecvMsg = recvMsg.map((msg) => <Text key={msg}>{msg}</Text>);
  return (
    <View style={styles.container}>
      <Text>Welcome to my App!</Text>
      <Text>{textOfRecvMsg}</Text>
      <TextInput
        value={msgToSend}
        onChangeText={(txt) => setMsgToSend(txt)}
        /*other way to express arrow function: 
        onChangeText = {function (text) {
        setMsgToSend(text)
      }}
      */
        backgroundColor="white"
        onSubmitEditing={sendMsg}
        placeholder="Enter chat msg.."
      />
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
