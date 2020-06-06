import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MainStackNavigator from './components/MainStackNavigator'
import LoginStackNavigator from './components/LoginStackNavigator';
import { isUserLoggedIn } from './components/ServerConnection';


export default function App() {
	if (isUserLoggedIn())
		return (
			<MainStackNavigator />
		);
	else
		return (
			<LoginStackNavigator />
		);
}
