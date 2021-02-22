import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

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

  const [rounds, setRounds] = useState(0);
  const currentLow = useRef(1); ///stored value and has no impact on component rerendering, just the logic below.
  const currentHigh = useRef(100); //stored value and has no impact on component rerendering, just the logic below.

  //destructing props below to use in useEffect. Pulling these props from outside, and givin them their own name; keeps track of changes.

  const { userChoice, onGameOver } = props;

  //useeffect determines if right choice/guess was made and if game was over.
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    //validates to make sure correct options are applied given the current guess.
    if (
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return; //stops function execution
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess; //stores computer guess as the new highest number.
    } else {
      currentLow.current = currentGuess; // stores the current guess, as the new lowestest boundary.ß
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds((currentRounds) => currentRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title='LOWER' onPress={nextGuessHandler.bind(this, 'lower')} />
        <Button
          title='GREATER'
          onPress={nextGuessHandler.bind(this, 'greater')}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%',
  },
});

export default GameScreen;
