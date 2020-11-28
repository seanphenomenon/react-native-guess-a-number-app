import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import Constants from "expo-constants";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";

export default function App() {
  //need to manage state here to display different screens and hold on to selected number from startGameScreen.
  const [userNumber, setUserNumber] = useState();

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  // store default components here. Game screen is triggered by onStartGame prop passed down to startGameScreen component.
  let content = <StartGameScreen onStartGame={startGameHandler} />;

  //check if userNumber is true and a number was chosen, then we can change content to game screen.
  if (userNumber) {
    content = <GameScreen userChoice={userNumber} />;
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  inputContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 10,
  },
});
