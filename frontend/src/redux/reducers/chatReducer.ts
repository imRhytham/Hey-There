import * as types from './../Types';

const initialState = {
	chats: [],
	loading: false,
	error: null,
	chat: {
		_id: '',
		chatName: '',
		users: [
			{
				_id: '',
				name: '',
				email: '',
				avatar: '',
			},
		],
		groupChat: false,
	},
	selectedChat: null,
};

export default function chatReducer(state = initialState, action: any) {
	switch (action.type) {
		case types.SET_CHAT_LOADER:
			return {
				...state,
				loading: action.payload,
			};
		case types.SET_CHAT_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case types.GET_CHATS:
			return {
				...state,
				chats: action.payload,
			};
		case types.ACCESS_CHAT:
			return {
				...state,
				chat: action.payload,
				chats: state.chats.find((chat: any) => chat._id === action.payload._id)
					? [...state.chats]
					: [action.payload, ...state.chats],
				selectedChat: action.payload,
			};
		case types.CREATE_GROUP_CHAT:
			return {
				...state,
				chat: action.payload,
				chats: [action.payload, ...state.chats],
			};
		case types.SELECT_CHAT:
			return {
				...state,
				selectedChat: action.payload,
				chat: action.payload,
			};
		case types.UNSELECT_CHAT:
			return {
				...state,
				selectedChat: initialState,
				chat: initialState,
			};
		case types.DELETE_CHAT:
			return {
				...state,
				chats: state.chats.filter(
					(chat: any) => chat._id !== action.payload._id
				),
				selectedChat: null,
			};
		case types.REMOVE_USER_FROM_GROUP:
			return {
				...state,
				chat: {
					...state.chat,
					users: state.chat.users.filter(
						(user: any) => user._id !== action.payload._id
					),
				},
			};
		case types.ADD_USER_TO_GROUP:
			return {
				...state,
				chat: {
					...state.chat,
					users: [action.payload, ...state.chat.users],
				},
			};
		default:
			return state;
	}
}
