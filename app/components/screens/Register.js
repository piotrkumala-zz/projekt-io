import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MenuButton from "../screen_components/common/MenuButton";
import InputBox from "../screen_components/Auth/InputBox";

import { registerUser } from '../ServerConnection';

function Login(props) {
  console.log(props);

  const navigation = props.navigation;

  // email input
  const emailDescription = "E-mail";
  const [emailValue, emailOnChangeText] = React.useState("");

  // password input
  const passwordDescription = "Hasło";
  const [passwordValue, passwordOnChangeText] = React.useState("");

  // firstName input
  const firstNameDescription = "Imię";
  const [firstNameValue, firstNameOnChangeText] = React.useState("");

  // lastName input
  const lastNameDescription = "Nazwisko";
  const [lastNameValue, lastNameOnChangeText] = React.useState("");

  // height input
  const heightDescription = "Wzrost";
  const [heightValue, heightOnChangeText] = React.useState("");

  // gender input
  const genderDescription = "Płeć";
  const [genderValue, genderOnChangeText] = React.useState("");

  // registerButton
  // TODO actual registering
  const registerButtonHandler = () => {
	  registerUser({
		  email: emailValue,
		  firstName: firstNameValue,
		  lastName: lastNameValue,
		  height: heightValue,
		  gender: genderValue,
		  password: passwordValue
	  });
  };
  const registerButtonDescription = "Zarejestruj się";

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer} keyboardShouldPersistTaps='always'>
        <InputBox
          description={emailDescription}
          onChangeText={emailOnChangeText}
        />
        <InputBox
          description={passwordDescription}
          onChangeText={passwordOnChangeText}
        />
        <InputBox
          description={firstNameDescription}
          onChangeText={firstNameOnChangeText}
        />
        <InputBox
          description={lastNameDescription}
          onChangeText={lastNameOnChangeText}
        />
        <InputBox
          description={heightDescription}
          onChangeText={heightOnChangeText}
        />
        <InputBox
          description={genderDescription}
          onChangeText={genderOnChangeText}
        />

        <MenuButton
          handler={registerButtonHandler}
          description={registerButtonDescription}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  buttonsContainer: {
    width: "80%",
    height: "100%",
    alignSelf: "center",
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 100,
  },
});

export default Login;
