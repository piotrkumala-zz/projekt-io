import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SzlugButton from '../screen_components/MainMenu/SzlugButton'
import MenuButton from '../screen_components/common/MenuButton'

function MainMenu(props) {

	console.log(props);

	const navigation = props.navigation;

	// dietButton
	const dietButtonHandler = () => {
		navigation.push('DietMenu');
	};
	const dietButtonDescription = "Dieta";

	// smokingButton
	const smokingButtonHandler = () => {
		navigation.push('SmokingMenu');
	};
	const smokingButtonDescription = "Palenie";

	return (
		<View style={styles.container}>
		<View style={styles.buttonsContainer}>

		<MenuButton 
		 handler={dietButtonHandler}
		 description={dietButtonDescription}/>

		<SzlugButton />

		<MenuButton 
		 handler={smokingButtonHandler}
		 description={smokingButtonDescription}/>

		</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	buttonsContainer: {
		width: '80%',
		height: '100%',
		alignSelf: 'center',
		padding: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},
	button: {
		width: 100,

	},
});

export default MainMenu;
