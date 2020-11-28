import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

//app  exclude will never guess users choice on the first try. Looking to get a random number between min and max.
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min); // rounded up
  max = Math.floor(max); // rounded down
  const randomNum = Math.floor(Math.random() * (max - min)) + min;
  if (randomNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice) // here we want to use the state of random num between min and max, and exclude the users choice because that is the solution.
  );

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={() => {}} />
        <Button title="GREATER" onPress={() => {}} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 300,
    maxWidth: "80%",
  },
});

export default GameScreen;
