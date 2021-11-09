/*
console.ignoredLogBox = ["Remote debugger"];
import { LogBox, YellowBox } from "react-native";
YellowBox.ignoreAllLogs([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?",
]);
*/

import React from "react";
import HomeScreen from "./components/HomeScreen";

export default function App() {
  return <HomeScreen />;
}
