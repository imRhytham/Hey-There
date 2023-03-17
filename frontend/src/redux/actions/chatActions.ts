import * as types from '../Types';
import axios from 'axios';
import { API_URI } from '../../common/common';

const setChatLoader = (payLoad: Boolean) => {
	return {
		type: types.SET_CHAT_LOADER,
		payload: payLoad,
	};
};

const setChatError = (payLoad: String) => {
	return {
		type: types.SET_CHAT_ERROR,
		payload: payLoad,
	};
};

export const getAllChats = () => async (dispatch: any) => {
	setChatLoader(true);
	try {
		const { data } = await axios.get(`${API_URI}/chats`, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
		});
		dispatch({
			type: types.GET_CHATS,
			payload: data,
		});
	} catch (error: any) {
		dispatch(setChatError(error.response.data.msg));
	} finally {
		setChatLoader(false);
	}
};

export const accessChat = (id: any) => async (dispatch: any) => {
	setChatLoader(true);
	try {
		const { data } = await axios.post(`${API_URI}/chats`, id, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
		});
		// socket.emit('join room', data._id);
		dispatch({
			type: types.ACCESS_CHAT,
			payload: data,
		});
	} catch (error: any) {
		dispatch(setChatError(error.response.data.msg));
	} finally {
		setChatLoader(false);
	}
};

export const createGroupChat = (body: any) => async (dispatch: any) => {
	setChatLoader(true);
	try {
		const { data } = await axios.post(`${API_URI}/chats/group`, body, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
		});
		dispatch({
			type: types.CREATE_GROUP_CHAT,
			payload: data,
		});
	} catch (error: any) {
		dispatch(setChatError(error.response.data.msg));
	} finally {
		setChatLoader(false);
	}
};

export const selectChat = (chat: any) => {
	return {
		type: types.SELECT_CHAT,
		payload: chat,
	};
};

export const unSelectChat = () => {
	return {
		type: types.UNSELECT_CHAT,
	};
};

export const deleteChat = (body: any) => async (dispatch: any) => {
	setChatLoader(true);
	try {
		await axios.delete(`${API_URI}/chats/${body._id}`, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
		});
		dispatch({
			type: types.DELETE_CHAT,
			payload: body,
		});
	} catch (error: any) {
		dispatch(setChatError(error.response.data.msg));
	} finally {
		setChatLoader(false);
	}
};

export const removeUserFromGroup = (body: any) => async (dispatch: any) => {
	setChatLoader(true);
	try {
		await axios.put(`${API_URI}/chats/group/remove`, body, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
		});
		dispatch({
			type: types.REMOVE_USER_FROM_GROUP,
			payload: body,
		});
	} catch (error: any) {
		dispatch(setChatError(error.response.data.msg));
	} finally {
		setChatLoader(false);
	}
};

export const addUserToGroup = (body: any) => async (dispatch: any) => {
	setChatLoader(true);
	try {
		await axios.put(`${API_URI}/chats/group/add`, body, {
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('token')}`,
			},
		});
		dispatch({
			type: types.ADD_USER_TO_GROUP,
			payload: body,
		});
	} catch (error: any) {
		dispatch(setChatError(error.response.data.msg));
	} finally {
		setChatLoader(false);
	}
};
