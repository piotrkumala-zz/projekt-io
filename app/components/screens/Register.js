import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import LoginTitle from "../screen_components/Auth/LoginTitle";
import MenuButton from "../screen_components/common/MenuButton";
import InputBox from "../screen_components/Auth/InputBox";

import { registerUser } from '../ServerConnection';

function Login(props) {
  console.log(props);

  const navigation = props.navigation;

  const Title = "Twoje dane";

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
	const [genderValue, setGenderValue] = useState('m');
	data = ([
		{
			value: 'm'
		},{
			value: 'k'
		}
	]);

	function handleGender(e) {
		setGenderValue(e);
	}

  // registerButton
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
		<LoginTitle description={Title}>"</LoginTitle>
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
        <InputBox
          description={firstNameDescription}
          onChangeText={firstNameOnChangeText}
		  secureTextEntry={false}
        />
        <InputBox
          description={lastNameDescription}
          onChangeText={lastNameOnChangeText}
		  secureTextEntry={false}
        />
        <InputBox
          description={heightDescription}
          onChangeText={heightOnChangeText}
		  secureTextEntry={false}
        />
		<TouchableOpacity style={styles.button}>
			<Dropdown
				value="m"
				onChangeText={handleGender}
				label="Płeć"
				data={data}
			/>
		</TouchableOpacity>
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
