import * as types from './../Types';

const initialState = {
	messages: [],
	loading: false,
	error: null,
};

export default function messageReducer(state = initialState, action: any) {
	switch (action.type) {
		case types.SET_MESSAGE_LOADER:
			return {
				...state,
				loading: action.payload,
			};
		case types.SET_MESSAGE_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case types.GET_MESSAGES:
			return {
				...state,
				messages: action.payload,
			};
		case types.SEND_MESSAGE:
			return {
				...state,
				messages: [...state.messages, action.payload],
			};
		default:
			return state;
	}
}
