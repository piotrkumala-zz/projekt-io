import React from "react";
import { StyleSheet, Text, View } from "react-native";

import MenuButton from "../screen_components/common/MenuButton";
import InputBox from "../screen_components/Auth/InputBox";

function Login(props) {
  console.log(props);

  const navigation = props.navigation;

  // email input
  const emailDescription = "E-mail";

  // password input
  const passwordDescription = "Hasło";

  // firstName input
  const firstNameDescription = "Imię";

  // lastName input
  const lastNameDescription = "Nazwisko";

  // height input
  const heightDescription = "Wzrost";

  // gender input
  const genderDescription = "Płeć";

  // registerButton
  const registerButtonHandler = () => {};
  const registerButtonDescription = "Zarejestruj się";

  // backButton
  const backButtonHandler = () => {
    navigation.push("Login");
  };
  const backButtonDescription = "Wróć";

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <InputBox description={emailDescription} />
        <InputBox description={passwordDescription} />
        <InputBox description={firstNameDescription} />
        <InputBox description={lastNameDescription} />
        <InputBox description={heightDescription} />
        <InputBox description={genderDescription} />

        <MenuButton
          handler={registerButtonHandler}
          description={registerButtonDescription}
        />
        <MenuButton
          handler={backButtonHandler}
          description={backButtonDescription}
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
