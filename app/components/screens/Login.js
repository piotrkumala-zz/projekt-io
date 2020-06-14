import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Modal from "react-native-modal";

import LoginTitle from "../screen_components/Auth/LoginTitle";
import MenuButton from "../screen_components/common/MenuButton";
import InputBox from "../screen_components/Auth/InputBox";

import { loginUser } from '../ServerConnection';
import { updateApp } from '../../App';

function Login(props) {
  console.log(props);

  const navigation = props.navigation;

  // title
  const Title = "Zaloguj się do FitHelper";

  // email input
  const emailDescription = "E-mail";
  const [emailValue, emailOnChangeText] = React.useState("");

  // password input
  const passwordDescription = "Hasło";
  const [passwordValue, passwordOnChangeText] = React.useState("");

  const [popupValue, setPopupVisible] = React.useState(false);
  const changePopupValue = () => {
	  setPopupVisible(!popupValue);
  };
  const [popupMessage, setPopupMessage] = React.useState("");
  const setPopupMessageAndTriggerPopup = (param) => {
	  setPopupVisible(true);
	  setPopupMessage(param);
  }
  // loginButton
  const loginButtonHandler = () => {
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    loginUser(emailValue, passwordValue, setPopupMessageAndTriggerPopup);
    sleep(2000);
    updateApp();
  };
  const loginButtonDescription = "Zaloguj się";

  // registerButton
  const registerButtonHandler = () => {
    navigation.push("Register");
  };
  const registerButtonDescription = "Zarejestruj się";

  return (
	  <View>
	  <Modal isVisible={popupValue}>
	  <View style={styles.content}>
	  <Text style={styles.contentTitle}>{popupMessage}</Text>
	  <Button testID={'close-button'} onPress={changePopupValue} title="Zamkij" />
	  </View>
	  </Modal>

    <View style={styles.container}>
      <LoginTitle description={Title}>"</LoginTitle>
      <View style={styles.buttonsContainer}>
        <InputBox
          description={emailDescription}
          onChangeText={emailOnChangeText}
		  secureTextEntry={false}
        />
        <InputBox
          description={passwordDescription}
          onChangeText={passwordOnChangeText}
		  secureTextEntry={true}
        />
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
  content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
});

export default Login;
