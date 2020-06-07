
userEmail = "";
hostAddress = "http://192.168.1.106:3000";

export const getEmail = () => {
	// TODO fetch from server
	// return userEmail;
	return userEmail;
}

export const loginUser = (email, password) => {
	userEmail = "adam@gmail.com"
}

export const getHost = () => {
	return hostAddress;
}

export const isUserLoggedIn = () => {
	return userEmail !== "";
}

export const registerUser = (userData) => {
	// userData {
}

