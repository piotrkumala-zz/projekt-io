import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainMenu from './screens/MainMenu'
import DietMenu from './screens/DietMenu'
import SmokingMenu from './screens/SmokingMenu'
import InformationMenu from './screens/InformationMenu'


const Stack = createStackNavigator();

export default function MainStackNavigator () {
	return (
		<NavigationContainer>
		<Stack.Navigator initialRouteName="MainMenu">
		<Stack.Screen name="MainMenu" component={MainMenu} options={{ title: "Menu główne"}} />
		<Stack.Screen name="DietMenu" component={DietMenu} options={{ title: "Dieta"}} />
		<Stack.Screen name="SmokingMenu" component={SmokingMenu} options={{ title: "Palenie"}} />
		<Stack.Screen name="InformationMenu" component={InformationMenu} options={{ title: "Informacje"}} />
		</Stack.Navigator>
		</NavigationContainer>
	);
}
