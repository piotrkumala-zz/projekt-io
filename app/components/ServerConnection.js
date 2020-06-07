
hostAddress = "http://172.20.10.2:3000";
userToken = ""

export const getHost = () => {
	return hostAddress;
}

export const getToken = () => {
	console.log(userToken);
	return userToken;
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
	var urlencoded = new URLSearchParams();
	urlencoded.append("email", userData.email); //"antonina@testowska.test");
	urlencoded.append("firstName", userData.firstName); //"321apud");
	urlencoded.append("lastName", userData.lastName); //"321apud");
	urlencoded.append("height", userData.height); //"321apud");
	urlencoded.append("gender", userData.gender); //"321apud");
	urlencoded.append("password", userData.password); //"321apud");


	
	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: urlencoded.toString(),//JSON.stringify(userData),
		redirect: 'follow'
	};

	console.log(userData);

	var res = undefined;

	fetch(getHost() + "/users", requestOptions)
		.then(response => response.json())
		.then(result => {
			console.log(result);
			if (result.token)
				res = result.token})
		.catch(error => console.log('error', error));

	console.log(res)
}

