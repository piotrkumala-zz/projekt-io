import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import MenuButton from '../screen_components/common/MenuButton'

function DietMenu(props) {

	const navigation = props.navigation;

	// tablesButton
	const tablesButtonHandler = () => {
		navigation.push('DietTables')
	};
	const tablesButtonDescription = "Tabele";

	// plannerButton
	const plannerButtonHandler = () => {
		
	};
	const plannerButtonDescription = "Planer posiłków";

	// notepadButton
	const notepadButtonHandler = () => {

	};
	const notepadButtonDescription = "Notatnik";

	return (
		<View style={styles.container}>
		<View style={styles.buttonsContainer}>

		<MenuButton 
		 handler={tablesButtonHandler}
		 description={tablesButtonDescription}/>

		<MenuButton 
		 handler={plannerButtonHandler}
		 description={plannerButtonDescription}/>

		<MenuButton 
		 handler={notepadButtonHandler}
		 description={notepadButtonDescription}/>

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


export default DietMenu;
