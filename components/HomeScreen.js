import React, { useEffect, useState, useRef } from "react";
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
  }, []);

  const sendMsg = () => {
    //client side
    //eventEmitter which means emit events on one side and register listeners on the other
    socket.current.emit("message", msgToSend);
    setMsgToSend("");
  };

  const textOfRecMsg = recMsg.map((msg) => <Text key={msg}>{msg}</Text>);
  return (
    <View style={styles.container}>
      <Text>It is Chatting Time! Start testing from here with 2 phones.</Text>
      <Text>{textOfRecMsg}</Text>
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
        placeholder="Let's chat..."
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
