import axios from 'axios';
import { API_URI } from '../../common/common';
import * as types from './../Types';

const config = {
	headers: {
		Authorization: `Bearer ${sessionStorage.getItem('token')}`,
	},
};

const setMessageLoader = (payload: boolean) => {
	return {
		type: types.SET_MESSAGE_LOADER,
		payload,
	};
};

const setMessageError = (payload: string) => {
	return {
		type: types.SET_MESSAGE_ERROR,
		payload,
	};
};

export const sendMessage = (payload: any) => {
	return {
		type: types.SEND_MESSAGE,
		payload,
	};
};

export const getMessages =
	(chatId: string, socket: any) => async (dispatch: any) => {
		setMessageLoader(true);
		try {
			const { data } = await axios.get(`${API_URI}/messages/${chatId}`, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem('token')}`,
				},
			});
			socket.emit('join room', chatId);
			dispatch({
				type: types.GET_MESSAGES,
				payload: data,
			});
		} catch (error: any) {
			dispatch(setMessageError(error.response.data.msg));
		} finally {
			setMessageLoader(false);
		}
	};

export const sendMessageApi =
	(payload: any, socket: any) => async (dispatch: any) => {
		setMessageLoader(true);
		try {
			const { data } = await axios.post(`${API_URI}/messages`, payload, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem('token')}`,
				},
			});
			socket.emit('new message', data);
			dispatch(sendMessage(data));
		} catch (error: any) {
			dispatch(setMessageError(error.response.data.msg));
		} finally {
			setMessageLoader(false);
		}
	};
