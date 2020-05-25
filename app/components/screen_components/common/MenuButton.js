import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";

const MenuButton = (props) => {
  // props.handler
  // props.description
  //
  const description = props.description;
  const handler = props.handler;

  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={props.handler} style={styles.button}>
        <Text style={styles.text}>{description}</Text>
      </TouchableOpacity>
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
    borderRadius: 50,
    padding: 15,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
    alignItems: "center",
    color: "#777",
  },
});

export default MenuButton;
