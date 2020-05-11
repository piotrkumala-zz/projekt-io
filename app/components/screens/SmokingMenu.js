import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MenuButton from '../screen_components/common/MenuButton'

function SmokingMenu(props) {

	const navigation = props.navigation;

	// informationButton
	const informationButtonHandler = () => {
		navigation.push('InformationMenu');

	};
	const informationButtonDescription = "Informacje";

	// statsButton
	const statsButtonHandler = () => {

	};
	const statsButtonDescription = "Statystyki";

	// goalsButton
	const goalsButtonHandler = () => {

	};
	const goalsButtonDescription = "Cele";

	return (
		<View style={styles.container}>
		<View style={styles.buttonsContainer}>

		<MenuButton 
		 handler={informationButtonHandler}
		 description={informationButtonDescription}/>

		<MenuButton 
		 handler={statsButtonHandler}
		 description={statsButtonDescription}/>

		<MenuButton 
		 handler={goalsButtonHandler}
		 description={goalsButtonDescription}/>

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


export default SmokingMenu;

