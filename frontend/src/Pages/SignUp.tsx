import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import Loader from '../components/Loader';
import TextField from '../components/TextField';
import Button from '../components/Button';

import Toast from '../components/Toast';
import { useNavigate } from 'react-router-dom';
interface form {
	name: string;
	email: string;
	password: string;
}

const SignUp = () => {
	const [user, setUser] = React.useState<form>({
		name: '',
		email: '',
		password: '',
	});
	const [loading, setLoading] = useState(false);
	const [openToast, setOpenToast] = useState(false);
	const [toast, setToast] = useState({
		message: '',
		color: '',
		duration: 0,
	});
	const navigate = useNavigate();

	const eventHandler = (e: ChangeEvent<HTMLInputElement>, key: string) => {
		setUser({
			...user,
			[key]: e.target.value,
		});
	};

	const handleSubmit = async () => {
		if (Object.values(user).some((v) => v === '')) {
			setToast({
				message: 'Please Enter All fields',
				color: 'orange',
				duration: 5000,
			});
			setOpenToast(true);
			return;
		}
		console.log(user);
		setLoading(true);
		try {
			const res = await axios.post(
				'http://localhost:5000/api/user/register',
				user
			);
			console.log(res);
			setToast({
				message: 'Registered Successfully',
				color: 'green',
				duration: 5000,
			});
			setOpenToast(true);
			setLoading(false);
			navigate('/');
		} catch (error) {
			console.log(error);
			setToast({
				message: 'Something went wrong',
				color: 'red',
				duration: 5000,
			});
			setOpenToast(true);
			setLoading(false);
		}
	};

	return (
		<>
			<Toast
				open={openToast}
				setOpen={setOpenToast}
				color={toast.color}
				duration={toast.duration}
				message={toast.message}
			/>
			<Loader open={loading} setOpen={setLoading} />
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
								<p className='text-center font-semibold mx-4 mb-0'>Sign Up</p>
							</div>

							<div className='mb-6'>
								<TextField
									type='text'
									placeholder='Name'
									value={user.name}
									onChange={(e) => eventHandler(e, 'name')}
								/>
							</div>

							<div className='mb-6'>
								<TextField
									type='email'
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
									className='inline-block px-7 py-3 bg-green text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
								>
									Sign Up
								</Button>
								<p className='text-sm font-semibold mt-2 pt-1 mb-0'>
									Already Have an account ?
									<a
										href='/'
										className='text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out'
									>
										Log in
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

export default SignUp;
