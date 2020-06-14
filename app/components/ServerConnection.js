
hostAddress = "http://192.168.0.87:3000";
userToken = "";
userEmail = "";

export const getHost = () => {
	return hostAddress;
}

export const getToken = () => {
	console.log(userToken);
	return userToken;
}

export const getEmail = () => {
	console.log("userEmail: ");
	console.log(userEmail);
	return userEmail;
}

export const isUserLoggedIn = () => {
	console.log(userToken)
	return userToken !== "";
}

export const loginUser = (email, password) => {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

	var urlencoded = new URLSearchParams();
	urlencoded.append("email", email);
	urlencoded.append("password", password);

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: urlencoded.toString(),
		redirect: 'follow'
	};

	fetch(getHost() + "/users/login", requestOptions)
		.then(response => response.json())
		.then(result => {
			console.log(result);
			if (result.token)
				userToken = result.token})
		.catch(error => console.log('error', error));

	userEmail = email;
}

export const registerUser = (userData) => {
	// userData {
	//   email: string,
	//   firstName: string,
	//   lastName: string,
	//   height: double,
	//   gender: string ("m" or "f"),
	//   password: string,
	// }
	// var urlencoded = new URLSearchParams();
	// urlencoded.append("email", userData.email); //"antonina@testowska.test");
	// urlencoded.append("firstName", userData.firstName); //"321apud");
	// urlencoded.append("lastName", userData.lastName); //"321apud");
	// urlencoded.append("height", userData.height); //"321apud");
	// urlencoded.append("gender", userData.gender); //"321apud");
	// urlencoded.append("password", userData.password); //"321apud");


	
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", 'application/json');

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: JSON.stringify(userData),//urlencoded.toString(),
		redirect: 'follow',

	};

	console.log(userData);

	var res = undefined;

	fetch(getHost() + "/users", requestOptions)
		.then(response => response.json())
		.then(result => {
			if (result.token) {
				res = result.token
				userData.setResultMessage("Rejestracja udana");
			}
			else {
				error_message = result.message
				userData.setResultMessage(error_message);
			}
		})
		.catch(error => { 
			console.log('error', error);
			error_message = error;
		});

	console.log(res)
}

