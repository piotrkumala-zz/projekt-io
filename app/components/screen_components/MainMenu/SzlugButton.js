import React from 'react';
import { 
	View,
	TouchableOpacity,
	StyleSheet,
	Image,
} from 'react-native';

const SzlugButton = () => {
	const szlugPressed = () => {
		console.log("UWAGA! Zapalono papieroska");
	};

	return (
		<View style={styles.view}>
		<TouchableOpacity
		 onPress={szlugPressed}
		 style={styles.button}>
		<Image style={styles.image} source={require('../../../assets/cigarette.png')}
		/>
		</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	view: {
		alignSelf: 'stretch',
		margin: 10
	},
	button: {
		backgroundColor: '#ddd',
		alignItems: 'center',
		borderRadius: 50,
		padding: 15
	},
	image: {
		margin: 20,
		resizeMode: 'contain',
		borderRadius: 10,
		height: 200

	}

});

export default SzlugButton;
