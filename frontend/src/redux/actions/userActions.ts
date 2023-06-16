import * as types from './../Types';
import axios from 'axios';
import { API_URI } from '../../common/common';

const setUserLoader = (payLoad: Boolean) => {
	return {
		type: types.SET_USER_LOADER,
		payload: payLoad,
	};
};

const config = {
	headers: {
		Authorization: `Bearer ${sessionStorage.getItem('token')}`,
	},
};

const setUserError = (payLoad: String) => {
	return {
		type: types.SET_USER_ERROR,
		payload: payLoad,
	};
};

export const getUsers = (user: string) => async (dispatch: any) => {
	setUserLoader(true);
	try {
		const { data } = await axios.get(`${API_URI}/user?name=${user}`, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
		});

		dispatch({
			type: types.GET_USERS,
			payload: data,
		});
	} catch (error: any) {
		dispatch(setUserError(error.response.data.msg));
	} finally {
		setUserLoader(false);
	}
};

export const updateUser = (user: any) => async (dispatch: any) => {
	setUserLoader(true);
	try {
		const { data } = await axios.put(`${API_URI}/user/edit-user`, user, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
		});
		dispatch({
			type: types.SET_USER,
			payload: data.data,
		});
	} catch (error: any) {
		dispatch(setUserError(error.response.data.msg));
	} finally {
		setUserLoader(false);
	}
};
