import * as types from './../Types';

const initialState = {
	user: sessionStorage.getItem('user')
		? JSON.parse(sessionStorage.getItem('user') || '')
		: null,
	isAuthenticated: sessionStorage.getItem('token' && 'user') ? true : false,
	loading: false,
	error: null,
};

export default function authReducer(state = initialState, action: any) {
	switch (action.type) {
		case types.SET_AUTH_LOADER:
			return {
				...state,
				loading: action.payload,
			};
		case types.SET_AUTH_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case types.LOGIN:
			return {
				...state,
				user: action.payload,
				isAuthenticated: true,
			};
		case types.LOGOUT:
			return {
				...state,
				user: null,
				isAuthenticated: false,
			};
		case types.SET_USER:
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
}
