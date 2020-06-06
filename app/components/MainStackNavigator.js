import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainMenu from './screens/MainMenu'
import DietMenu from './screens/DietMenu'
import SmokingMenu from './screens/SmokingMenu'
import InformationMenu from './screens/InformationMenu'
import DietTables from './screens/DietTables';
import SmokingStats from './screens/SmokingStats';
import NotesMenu from './screens/NotesMenu';
import AddProduct from './screens/AddProduct';
import DietPlaner from './screens/DietPlanner';
import Login from "./screens/Login";
import Register from "./screens/Register";
import MainMenu from "./screens/MainMenu";
import DietMenu from "./screens/DietMenu";
import SmokingMenu from "./screens/SmokingMenu";
import InformationMenu from "./screens/InformationMenu";

const Stack = createStackNavigator();

export default function MainStackNavigator () {
	return (
		<NavigationContainer>
		<Stack.Navigator initialRouteName="MainMenu">
		<Stack.Screen name="MainMenu" component={MainMenu} options={{ title: "Menu główne"}} />
		<Stack.Screen name="DietMenu" component={DietMenu} options={{ title: "Dieta"}} />
		<Stack.Screen name="SmokingMenu" component={SmokingMenu} options={{ title: "Palenie"}} />
		<Stack.Screen name="InformationMenu" component={InformationMenu} options={{ title: "Informacje"}} />
		<Stack.Screen name="DietTables" component={DietTables} options={{ title: "Tabele"}} />
		<Stack.Screen name="SmokingStats" component={SmokingStats} options={{ title: "Statystyki"}} />
		<Stack.Screen name="NotesMenu" component={NotesMenu} options={{ title: "Notatki"}} />
		<Stack.Screen name="AddProduct" component={AddProduct} options={{title: "Dodaj produkt"}} />
		<Stack.Screen name="DietPlanner" component={DietPlaner} options={{title: "Harmonogram"}} />
		<Stack.Screen name="Login" component={Login} options={{title: "Logowanie"}} />
		<Stack.Screen name="Register component={Register} options={{title: "Rejestracja" }} />
		</Stack.Navigator>
		</NavigationContainer>
	);
}
