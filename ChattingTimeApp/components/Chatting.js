import React from "react";
import { View, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { Header } from "react-navigation-stack";
import { useDispatch, useSelector } from "react-redux";

Chatting.navigationOptions = (screenProps) => ({
  title: screenProps.navigation.getParam("name"),
});

export default function Chatting({ navigation }) {
  const dispatch = useDispatch();
  const selfMember = useSelector((state) => state.selfMember);
  const conversations = useSelector((state) => state.conversations);
  const memberId = navigation.getParam("memberId");
  const messages = conversations[memberId].messages;

  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        renderUsernameOnMessage
        messages={messages}
        onSend={(messages) => {
          dispatch({
            type: "private_message",
            data: { message: messages[0], conversationId: memberId },
          });
          dispatch({
            type: "server/private_message",
            data: { message: messages[0], conversationId: memberId },
          });
        }}
        user={{
          _id: selfMember.memberId,
        }}
      />
      {Platform.OS === "android" && (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Header.HEIGHT + 20}
        />
      )}
    </View>
  );
}
