import React from "react";
import { View, StyleSheet } from "react-native";

//created this Card component seperately to reuse the original input container shadow styles from start game screen. spread operator  allows you to pull all key/value pairs from styles, and can also override them with additional styles from outside component and merge them using prop style spread operator.
const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "#fff",
    elevation: 5, // this prop is used for it to display on andriod ONLY
    padding: 20,
    borderRadius: 10,
  },
});

export default Card;
