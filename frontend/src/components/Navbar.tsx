import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import {
	ArrowLeftOnRectangleIcon,
	MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import TextField from './TextField';
import useDebounce from '../Hooks/useDebounce';
import { getUsers } from '../redux/actions/userActions';
import ChatCard from './ChatCard';
import {
	accessChat,
	getAllChats,
	selectChat,
	unSelectChat,
} from '../redux/actions/chatActions';
import UserModal from './UserModal';

const Navbar = () => {
	const dispatch: any = useDispatch();
	const user = useSelector((state: any) => state.auth.user);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [open, setOpen] = useState<boolean>(false);
	const [search, setSearch] = useState<string>('');
	const debouncedValue = useDebounce(search, 500);
	const [openSearch, setOpenSearch] = useState<boolean>(false);
	const users = useSelector((state: any) => state.users.users);

	useEffect(() => {
		if (openSearch) {
			dispatch(getUsers(debouncedValue));
		}
	}, [debouncedValue]);

	const startChat = (user: any) => {
		const body = {
			userId: user._id,
		};
		dispatch(accessChat(body));
		setOpenSearch(false);
	};

	return (
		<>
			<header className='flex w-full items-center justify-between border-b-2 border-gray-200 bg-white p-2'>
				<div className='flex items-center space-x-2'>
					<div className='flex items-center space-x-2'>
						<button
							onClick={() => setOpenSearch(!openSearch)}
							className='flex items-center space-x-2 text-gray-500 hover:text-gray-700 p-3'
						>
							<MagnifyingGlassIcon className='h-6 w-6 text-gray-500' />
							Search User
						</button>
					</div>
				</div>

				<div>
					<h1 className='md:text-3xl font-bold'>Hey There</h1>
				</div>
				<div className='flex items-center space-x-2'>
					<div>
						<img
							src={user.avatar}
							alt='avatar'
							className='h-8 w-8 rounded-full cursor-pointer'
							onClick={() => setOpenModal(true)}
						/>
					</div>
					<button
						onClick={() => {
							dispatch(logout());
							dispatch(unSelectChat());
						}}
						className='flex items-center space-x-2 text-gray-500 hover:text-gray-700'
					>
						<ArrowLeftOnRectangleIcon className='h-6 w-6' />
						<span>Logout</span>
					</button>
				</div>

				<Modal open={openModal} setOpen={setOpenModal} title='Profile'>
					<UserModal user={user} />
				</Modal>
				<Modal title='Search Users' open={openSearch} setOpen={setOpenSearch}>
					<div className='flex flex-col items-center space-y-2'>
						<TextField
							value={search}
							onChange={(e: any) => {
								setSearch(e.target.value);
							}}
							placeholder='Search User'
							icon={<MagnifyingGlassIcon className='h-6 w-6 text-gray-500' />}
						/>
						{users.length > 0 ? (
							<div className='flex flex-col items-center space-y-2'>
								{users.map((user: any) => (
									<ChatCard
										_id={user._id}
										lastMessage={user.email}
										name={user.name}
										key={user._id}
										onClick={() => startChat(user)}
									/>
								))}
							</div>
						) : (
							<p className='text-gray-500'>No User Found</p>
						)}
					</div>
				</Modal>
			</header>
		</>
	);
};

export default Navbar;
