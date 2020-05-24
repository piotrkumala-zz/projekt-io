import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";

const InputBox = (props) => {
  // props.handler
  // props.description
  //
  const description = props.description;
  //const handler = props.handler;

  return (
    <View style={styles.view}>
      <TouchableOpacity style={styles.button}>
        <Text>{description}</Text>
        <TextInput style={styles.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignSelf: "stretch",
    margin: 5,
  },
  button: {
    backgroundColor: "#ddd",
    alignItems: "center",
    borderRadius: 25,
    padding: 0,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    alignItems: "center",
    color: "#777",
  },
});

export default InputBox;
