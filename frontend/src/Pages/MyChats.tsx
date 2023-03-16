import { useEffect, useState } from 'react';
import ChatCard from '../components/ChatCard';
import { PlusIcon } from '@heroicons/react/24/outline';
import Modal from '../components/Modal';
import TextField from '../components/TextField';
import useDebounce from '../Hooks/useDebounce';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../redux/actions/userActions';
import Button from '../components/Button';
import Chips from '../components/Chips';
import {
	createGroupChat,
	getAllChats,
	selectChat,
} from '../redux/actions/chatActions';
import { getSender } from '../common/common';
import Loader from '../components/Loader';

interface formData {
	chatName: string;
	users: string[];
	groupDescription: string;
}

const MyChats = () => {
	const [open, setOpen] = useState<boolean>(false);
	const [data, setData] = useState<formData>({
		chatName: '',
		users: [],
		groupDescription: '',
	});
	const [search, setSearch] = useState<string>('');
	const debounceValue = useDebounce(search, 500);
	const dispatch: any = useDispatch();
	const self = useSelector((state: any) => state.auth.user);
	const users = useSelector((state: any) => state.users.users);
	const Allchats = useSelector((state: any) => state.chats.chats);
	const selectedChat = useSelector((state: any) => state.chats.selectedChat);
	const loading = useSelector((state: any) => state.chats.loading);

	useEffect(() => {
		dispatch(getAllChats());
	}, [dispatch]);

	useEffect(() => {
		if (open) {
			dispatch(getUsers(debounceValue));
		}
	}, [debounceValue]);

	const handleAddUser = (user: any) => {
		const existed = data.users.find((u: any) => u?._id === user?._id);
		if (!existed) {
			setData({ ...data, users: [...data.users, user] });
		}
	};

	const handleRemoveUser = (user: any) => {
		const filtered = data.users.filter((u: any) => u?._id !== user?._id);
		setData({ ...data, users: filtered });
	};

	const handleSubmit = () => {
		const body = {
			chatName: data.chatName,
			users: [self._id, ...data.users.map((u: any) => u?._id)],
			groupDescription: data.groupDescription,
		};
		dispatch(createGroupChat(body));
		setData({
			chatName: '',
			users: [],
			groupDescription: '',
		});
		setOpen(false);
		setSearch('');
	};

	return (
		<>
			<Loader open={loading} />
			<div
				className={
					selectedChat?._id
						? 'hidden flex-col w-1/5 h-[88vh] bg-gray-200 rounded-lg p-5 md:flex'
						: 'flex-col w-full md:w-1/5 h-[88vh] bg-gray-200 rounded-lg p-5 md:flex'
				}
			>
				<div className='text-xl font-bold mb-3 flex flex-row justify-between items-center flex-wrap'>
					<h1>My Chats</h1>
					<button
						className='text-gray-500 hover:text-gray-700  inline-flex items-center bg-slate-50 p-2 rounded-md'
						onClick={() => setOpen(true)}
					>
						<PlusIcon className='h-6 w-6' />
						<p>Create group</p>
					</button>
				</div>
				<div className='flex flex-col space-y-2 overflow-auto'>
					{Allchats.map((chat: any) => (
						<ChatCard
							onClick={() => dispatch(selectChat(chat))}
							key={chat._id}
							_id={chat._id}
							name={
								chat.groupChat
									? chat.chatName
									: getSender(self, chat.users).name
							}
							lastMessage={chat?.latestMessage[0]?.text || ''}
						/>
					))}
				</div>
			</div>
			<Modal open={open} setOpen={setOpen} title='Create Group'>
				<div className='flex flex-col items-center space-y-2'>
					<p className='text-gray-500'>
						Create a group to chat with your friends
					</p>
					<TextField
						onChange={(e) => setData({ ...data, chatName: e.target.value })}
						value={data.chatName}
						placeholder='Chat Name'
					/>
					<TextField
						onChange={(e) =>
							setData({ ...data, groupDescription: e.target.value })
						}
						value={data.groupDescription}
						placeholder='Group Description'
					/>
					<TextField
						onChange={(e) => setSearch(e.target.value)}
						value={search}
						placeholder='Search User'
					/>
					<div className='flex flex-row items-center space-x-2 overflow-auto'>
						{data.users.map((user: any) => (
							<Chips
								label={user.name}
								onClick={() => handleRemoveUser(user)}
								canDelete={true}
							/>
						))}
					</div>
					<div className='flex flex-col space-y-2'>
						{users.map((user: any) => (
							<ChatCard
								onClick={() => handleAddUser(user)}
								_id={user._id}
								lastMessage={user.email}
								name={user.name}
							/>
						))}
					</div>
					<Button
						disabled={
							data.chatName === '' ||
							data.groupDescription === '' ||
							data.users.length < 2
						}
						className='bg-blue-500 p-2 rounded-md text-white disabled:bg-blue-200'
						onClick={handleSubmit}
					>
						Create Group
					</Button>
				</div>
			</Modal>
		</>
	);
};

export default MyChats;
