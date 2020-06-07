import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login';
import Register from './screens/Register';

const Stack = createStackNavigator();

export default function LoginStackNavigator () {
	return (
		<NavigationContainer>
		<Stack.Navigator initialRouteName="Login">
		<Stack.Screen name="Login" component={Login} options={{title: "Logowanie"}} />
		<Stack.Screen name="Register" component={Register} options={{title: "Rejestracja" }} />
		</Stack.Navigator>
		</NavigationContainer>
	);
}
