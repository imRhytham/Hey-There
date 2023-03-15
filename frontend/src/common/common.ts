export const API_URI = 'http://localhost:5000/api';

export const getSender = (loggedUser: any, users: any) => {
	return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isAdmin = (loggedUser: any, admin: any) => {
	return loggedUser._id === admin._id;
};
