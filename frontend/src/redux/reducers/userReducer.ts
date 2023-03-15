import * as types from './../Types';

const initialState = {
	users: [],
	loading: false,
	error: null,
};

export default function userReducer(state = initialState, action: any) {
	switch (action.type) {
		case types.SET_USER_LOADER:
			return {
				...state,
				loading: action.payload,
			};
		case types.SET_USER_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case types.GET_USERS:
			return {
				...state,
				users: action.payload,
			};
		default:
			return state;
	}
}
