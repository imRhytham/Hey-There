import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Chats from './Pages/Chats';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';

const PrivateRoute = ({ children }: any) => {
	const isAuthenticated: boolean = useSelector(
		(state: any) => state.auth.isAuthenticated
	);
	if (!isAuthenticated) {
		return <Navigate to='/login' />;
	}
	return children;
};

function App() {
	const isAuthenticated: boolean = useSelector(
		(state: any) => state.auth.isAuthenticated
	);
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Navigate to={isAuthenticated ? '/chat' : '/login'} />}
					/>
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
					<Route
						path='/chat'
						element={
							<PrivateRoute>
								<Chats />
							</PrivateRoute>
						}
					/>
				</Routes>
			</BrowserRouter>
			{/* <Chats /> */}
		</>
	);
}

export default App;
