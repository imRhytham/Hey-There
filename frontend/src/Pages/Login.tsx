import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Loader from '../components/Loader';
import TextField from '../components/TextField';
import Toast from '../components/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { stat } from 'fs';

interface form {
	email: string;
	password: string;
}

const Login = () => {
	const [user, setUser] = useState<form>({
		email: '',
		password: '',
	});
	const navigate: any = useNavigate();
	const dispatch: any = useDispatch();
	const loading: boolean = useSelector((state: any) => state.auth.loading);
	const error: string = useSelector((state: any) => state.auth.error);
	const isAuthenticated: boolean = useSelector(
		(state: any) => state.auth.isAuthenticated
	);

	const eventHandler = (e: ChangeEvent<HTMLInputElement>, key: string) => {
		setUser((prev) => ({ ...prev, [key]: e.target.value }));
	};

	const handleSubmit = async () => {
		dispatch(login(user));
		if (isAuthenticated) {
			navigate('/chats');
		}
	};

	return (
		<>
			<Loader open={loading} />
			<Toast open={error} color='red' message={error} />
			<section className='h-screen'>
				<div className='px-6 h-full text-gray-800'>
					<div className='flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6'>
						<div className='grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0'>
							<img
								src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp'
								className='w-full'
								alt='Sample'
							/>
						</div>
						<div className='xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0'>
							<div className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
								<p className='text-center font-semibold mx-4 mb-0'>Login</p>
							</div>

							<div className='mb-6'>
								<TextField
									type='text'
									placeholder='Email address'
									value={user.email}
									onChange={(e) => eventHandler(e, 'email')}
								/>
							</div>

							<div className='mb-6'>
								<TextField
									type='password'
									placeholder='Password'
									value={user.password}
									onChange={(e) => eventHandler(e, 'password')}
								/>
							</div>

							<div className='text-center lg:text-left'>
								<Button
									onClick={handleSubmit}
									disabled={Object.values(user).some((item) => item === '')}
									className='inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out disabled:bg-green-400'
								>
									Login
								</Button>
								<p className='text-sm font-semibold mt-2 pt-1 mb-0'>
									Don't have an account?
									<a
										href='/signup'
										className='text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out'
									>
										Register
									</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
