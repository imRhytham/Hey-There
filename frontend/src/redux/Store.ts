import rootReducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

const Store = createStore(
	rootReducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
