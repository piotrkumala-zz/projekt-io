
userEmail = "";
hostAddress = "http://10.5.50.231:3000";
userToken = ""

export const getEmail = () => {
	// TODO fetch from server
	// return userEmail;
	return userEmail;
}

export const loginUser = (email, password) => {
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

	var urlencoded = new URLSearchParams();
	urlencoded.append("email", email); //"antonina@testowska.test");
	urlencoded.append("password", password); //"321apud");

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: urlencoded.toString(),
		redirect: 'follow'
	};

	fetch(hostAddress + "/users/login", requestOptions)
		.then(response => response.json())
		.then(result => {
			console.log(result);
			if (result.token)
				userToken = result.token})
		.catch(error => console.log('error', error));
}

export const getHost = () => {
	return hostAddress;
}

export const isUserLoggedIn = () => {
	console.log(userToken)
	return userToken !== "";
}

export const registerUser = (userData) => {
	// userData {
}

