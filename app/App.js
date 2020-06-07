import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MainStackNavigator from './components/MainStackNavigator'
import LoginStackNavigator from './components/LoginStackNavigator';
import { isUserLoggedIn } from './components/ServerConnection';

export var updateApp = () => { };

export default class App extends Component {
	render() {
	updateApp = () => {
		this.forceUpdate();
	};
	// updateApp();

	if (isUserLoggedIn())
		return (
			<MainStackNavigator />
		);
	else
		return (
			<LoginStackNavigator rerenderApp={updateApp} />
		);
	}
}
