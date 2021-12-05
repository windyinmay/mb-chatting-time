import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Contacts from "./components/Contacts";
import HomeScreen from "./components/HomeScreen";
import SignIn from "./components/SignIn";

const AppStack = createStackNavigator({ ChattingTime: Contacts });

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
