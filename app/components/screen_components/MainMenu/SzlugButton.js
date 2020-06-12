
import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Image,
} from 'react-native';

import { getHost, getEmail, getToken } from '../../ServerConnection';

const SzlugButton = () => {
	const [typ, setTyp] = useState('Normalny');
	data = ([
		{
			value: 'Normalny'
		},{
			value: 'Mocny'
		}, {
			value: 'Light'
		},{
			value: 'Ultra Light'
		}
	]);

	const szlugPressed = async () => {

		let priceMaping={
			'Normalny': 1.3,
			'Mocny':1.4,
			'Light':1.6,
			'Ultra Light':2.2,
		}
		console.log("UWAGA! Zapalono papieroska");
		console.log(data);
		
		const data1 = {
			email: getEmail(),
			day: new Date(Date.now()).toISOString().replace('T', ' ').replace('Z', ''),
			count: 1,
			price: priceMaping[typ],
			type: typ,
		};
		console.log(data1);1.1
		const res = await fetch(getHost() + '/smoke/add?email=' + getEmail(), {
			method: 'POST',
			body: JSON.stringify(data1),
			headers: {
				'Content-Type': 'application/json',
				'x-access-token': getToken()
			}
		});
	}
	function handleRodzaj(e) {
//		console.log(e);
		setTyp(e);
	}
	return (
		<View style={styles.view}>

			<Dropdown
				value="Normalny"
				onChangeText={handleRodzaj}
				label="Rodzaj"
				data={data}
				

			/>


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
