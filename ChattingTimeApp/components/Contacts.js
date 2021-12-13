import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
//useSelector to display all the users online connected in contacts list

export default function Contacts({ navigation }) {
  const membersOnline = useSelector((state) => state.membersOnline);
  console.log("membersOnline", membersOnline);
  const {
    itemContainerStyle,
    avatarImgStyle,
    avatarNameViewStyle,
    signInButton,
    textButton,
  } = styles;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <FlatList
        data={membersOnline}
        renderItem={({ item }) => {
          console.log("item", item);
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Chat", {
                  name: item.username,
                  userId: item.memberId,
                })
              }
            >
              <View style={itemContainerStyle}>
                <Image style={avatarImgStyle} source={{ uri: item.avatar }} />
                <View style={avatarNameViewStyle}>
                  <Text style={{ fontSize: 20 }}>{item.username}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.memberId}
      />
      <TouchableOpacity
        style={signInButton}
        onPress={() => {
          navigation.navigate("SignIn");
        }}
      >
        <Text style={textButton}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainerStyle: { flex: 1, flexDirection: "row" },
  avatarImgStyle: { width: 100, height: 100, borderRadius: 50 },
  avatarNameViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
