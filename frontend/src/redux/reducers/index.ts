import { combineReducers } from 'redux';
import authReducer from './authReducer';
import chatReducer from './chatReducer';
import messageReducer from './messageReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	users: userReducer,
	chats: chatReducer,
	messages: messageReducer,
});

export default rootReducer;
