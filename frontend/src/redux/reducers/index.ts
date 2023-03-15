import { combineReducers } from 'redux';
import authReducer from './authReducer';
import chatReducer from './chatReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	users: userReducer,
	chats: chatReducer,
});

export default rootReducer;
