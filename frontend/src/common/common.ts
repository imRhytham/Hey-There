export const API_URI = 'http://localhost:5000/api';

export const getSender = (loggedUser: any, users: any) => {
	return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isAdmin = (loggedUser: any, admin: any) => {
	return loggedUser._id === admin._id;
};

export const isSameSender = (
	messages: any,
	m: any,
	i: number,
	userId: string
) => {
	return (
		i < messages.length - 1 &&
		(messages[i + 1]?.sender?.id !== m?.sender._id ||
			messages[i + 1]?.sender?._id === undefined) &&
		m?.sender._id !== userId
	);
};

export const isLastMessage = (messages: any, i: number, userId: string) => {
	return (
		i === messages?.length - 1 &&
		messages[messages.length - 1]?.sender?._id !== userId &&
		messages[messages.length - 1]?.sender?._id
	);
};

export const isSameSenderMargin = (
	messages: any,
	m: any,
	i: number,
	userId: string
) => {
	if (
		i < messages.length - 1 &&
		messages[i + 1]?.sender?.id === m?.sender?.id &&
		messages[i + 1]?.sender?._id !== userId
	) {
		return 33;
	} else if (
		(i < messages.length - 1 &&
			messages[i + 1]?.sender?._id !== m?.sender?._id &&
			messages[i + 1]?.sender?._id !== userId) ||
		(i === messages.length - 1 && messages[i]?.sender?._id !== userId)
	) {
		return 0;
	} else return 'auto';
};
