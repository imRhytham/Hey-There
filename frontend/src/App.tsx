import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chats from './Pages/Chats';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/chat' element={<Chats />} />
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
