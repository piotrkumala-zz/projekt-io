import React from "react";
import { StyleSheet, Text, View } from "react-native";

import LoginTitle from "../screen_components/Auth/LoginTitle";
import MenuButton from "../screen_components/common/MenuButton";
import InputBox from "../screen_components/Auth/InputBox";

function Login(props) {
  console.log(props);

  const navigation = props.navigation;

  // title
  const Title = "Zaloguj się do FitHelper";

  // email input
  const emailDescription = "E-mail";

  // password input
  const passwordDescription = "Hasło";

  // loginButton
  const loginButtonHandler = () => {
    navigation.push("MainMenu");
  };
  const loginButtonDescription = "Zaloguj się";

  // registerButton
  const registerButtonHandler = () => {
    navigation.push("Register");
  };
  const registerButtonDescription = "Zarejestruj się";

  return (
    <View style={styles.container}>
      <LoginTitle description={Title}>"</LoginTitle>
      <View style={styles.buttonsContainer}>
        <InputBox description={emailDescription} />
        <InputBox description={passwordDescription} />
        <MenuButton
          handler={loginButtonHandler}
          description={loginButtonDescription}
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
    height: "80%",
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
