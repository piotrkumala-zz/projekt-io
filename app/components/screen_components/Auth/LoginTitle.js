import React from "react";
import { View, StyleSheet, Text } from "react-native";

const LoginTitle = (props) => {
  // props.handler
  // props.description
  //
  const description = props.description;

  return (
    <View style={styles.view}>
      <Text style={styles.text}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignSelf: "stretch",
    margin: 10,
  },
  button: {
    backgroundColor: "#ddd",
    alignItems: "center",
    borderRadius: 0,
    padding: 0,
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    alignItems: "center",
    color: "#777",
  },
});

export default LoginTitle;
