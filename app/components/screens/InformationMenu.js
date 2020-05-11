import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MenuButton from '../screen_components/common/MenuButton'

function InformationMenu(props) {

	const navigation = props.navigation;

	// healthDamageButton
	const healthDamageButtonHandler = () => {

	};
	const healthDamageButtonDescription = "Wpływ na zdrowie";

	// alternativesButton
	const alternativesButtonHandler = () => {

	};
	const alternativesButtonDescription = "Zdrowsze alternatywy";

	// helpButton
	const helpButtonHandler = () => {

	};
	const helpButtonDescription = "Profesjonalna pomoc";

	return (
		<View style={styles.container}>
		<View style={styles.buttonsContainer}>

		<MenuButton 
		 handler={healthDamageButtonHandler}
		 description={healthDamageButtonDescription}/>

		<MenuButton 
		 handler={alternativesButtonHandler}
		 description={alternativesButtonDescription}/>

		<MenuButton 
		 handler={helpButtonHandler}
		 description={helpButtonDescription}/>

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


export default InformationMenu;
