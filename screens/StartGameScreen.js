import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import Card from "../components/Card";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = (inputText) => {
    // here we are updating the state of the inputted value, and validating it with regex to discard any non-numeric values and only between 0-9 entirely with an empty string.
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue); // coverts input string into a number

    //this if statements just confirms for invalid numbers(including 0)  and will ultimately dynamically display/save chosen number.
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );
      return;
    }
    setConfirmed(true);
    setEnteredValue("");
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss();
  };

  //confirmed output variable is for the visual feedback of what user entered.
  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <Text> You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button
          title="START GAME"
          onPress={() => props.onStartGame(selectedNumber)} //forwarding currently selected number in onStartGame.
        />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2} //number length of allowable numbers to choose from
            value={enteredValue}
            onChangeText={numberInputHandler} //remember that you cannot just use OnChange as a prop in Text input. It needs to be OnChangeText.
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                color={Colors.secondary}
                onPress={resetInputHandler}
              ></Button>
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                color={Colors.accent}
                onPress={confirmInputHandler}
              ></Button>
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1, // allows screen to take up all the space it can get.
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10, // replaces margin bottom and margin top
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingHorizontal: 15,
  },
  button: {
    width: "80%",
  },
  input: {
    width: 50,
    fontSize: 15,
    textAlign: "center", // aligns cursor to center
  },

  summaryContainer: {
    marginTop: 50,
    alignItems: "center",
  },
});

export default StartGameScreen;
