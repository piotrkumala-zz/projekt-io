import React from 'react';
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Image,
} from 'react-native';

const SzlugButton = () => {
	const szlugPressed = async () => {
		console.log("UWAGA! Zapalono papieroska");
		const data1 = {
			email: 'adam@gmail.com',
			day: new Date(Date.now()).toISOString().replace('T', ' ').replace('Z', ''),
			count: 1,
			price: 1.1,
			type: 'normal',
		};
		console.log(data1);
		const res = await fetch('http://192.168.178.200:3000/smoke/add', {
			method: 'POST',
			body: JSON.stringify(data1),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

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
