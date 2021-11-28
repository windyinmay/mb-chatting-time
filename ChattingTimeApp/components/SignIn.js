import React, { useState } from "react";
import {
  View,
  Button,
  Platform,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from "react-native";

export default function SignIn({ joinToChat }) {
  const [username, setUserName] = useState("");
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        resizeMode="contain"
        style={{ flex: 1 }}
        source={require("../assets/chat-icon.png")}
      />
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <TextInput
          onChangeText={(txt) => setUserName(txt)}
          value={username}
          style={{ fontSize: 20, textAlign: "center" }}
          placeholder="Enter username"
        />
        <Button title="Join to chat" onPress={() => joinToChat(username)} />
      </View>
      {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />}
    </View>
  );
}
