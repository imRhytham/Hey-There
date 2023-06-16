import { PencilSquareIcon } from '@heroicons/react/24/outline';
import React, { ChangeEvent, useState } from 'react';
import TextField from './TextField';
import ImageUpload from './ImageUpload';
import Button from './Button';
import { updateUser } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';

interface UserProps {
	user: {
		name: string;
		avatar: string;
		status: string;
		email: string;
	};
}

const UserModal = ({ user }: UserProps) => {
	const [edit, setEdit] = useState<boolean>(false);
	const [userDetails, setUserDetails] = useState<any>(user);
	const dispatch: any = useDispatch();

	const eventHandler = (e: ChangeEvent<HTMLInputElement>, key: string) => {
		setUserDetails({
			...user,
			[key]: e.target.value,
		});
	};

	const uploadImage = (url: string) => {
		setUserDetails((prev: any) => ({ ...prev, avatar: url }));
	};

	const handleSubmit = () => {
		dispatch(updateUser(userDetails));
		setEdit(false);
	};

	return (
		<>
			{edit ? (
				<div>
					<div className='flex flex-col items-center space-y-2'>
						<TextField
							type='text'
							placeholder='Name'
							value={userDetails.name}
							onChange={(e) => eventHandler(e, 'name')}
						/>
						<TextField
							type='text'
							placeholder='Status'
							value={userDetails.status}
							onChange={(e) => eventHandler(e, 'status')}
						/>
						<ImageUpload
							onImageUpload={uploadImage}
							image={userDetails.avatar}
						/>
						<Button
							onClick={handleSubmit}
							className='inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out disabled:bg-green-400'
						>
							Update
						</Button>
					</div>
				</div>
			) : (
				<div>
					<PencilSquareIcon
						className='h-8 w-8 float-right cursor-pointer'
						onClick={() => setEdit(true)}
					/>
					<div className='flex flex-col items-center space-y-2'>
						<img
							src={user.avatar}
							alt='avatar'
							className='h-18 w-18 rounded-full'
						/>
						<h1 className='text-2xl font-bold'>{user.name}</h1>
						<p className='text-gray-500'>{user.status}</p>
					</div>
				</div>
			)}
		</>
	);
};

export default UserModal;
