import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Contacts from "./components/Contacts";
import SignIn from "./components/SignIn";
import Chatting from "./components/Chatting";

const AppStack = createStackNavigator({
  OnlineFriends: Contacts,
  ChattingTime: Chatting,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      App: AppStack,
      Join: SignIn,
    },
    //Another option
    {
      initialRouteName: "Join",
    }
  )
);
