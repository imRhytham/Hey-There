import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	ArrowUturnLeftIcon,
	EllipsisVerticalIcon,
	PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import {
	addUserToGroup,
	deleteChat,
	removeUserFromGroup,
	unSelectChat,
} from '../redux/actions/chatActions';
import { getSender, isAdmin } from '../common/common';
import Modal from '../components/Modal';
import TextField from '../components/TextField';
import Chips from '../components/Chips';
import useDebounce from '../Hooks/useDebounce';
import { getUsers } from '../redux/actions/userActions';
import ChatCard from '../components/ChatCard';
import {
	getMessages,
	sendMessage,
	sendMessageApi,
} from '../redux/actions/messageActions';
import ScrollableChat from './ScrollableChat';
import Loader from '../components/Loader';
import { io } from 'socket.io-client';
import Button from '../components/Button';

const ENDPOINT = 'https://heythere-ces0.onrender.com';
var socket: any, currentChattingWith: string;

const ChatBox = () => {
	const dispatch: any = useDispatch();
	const selectedChat: any = useSelector((state: any) => state.chats.chat);
	const loggedUser: any = useSelector((state: any) => state.auth.user);
	const [openModal, setOpenModal] = useState<boolean>(false);
	const [data, setData] = useState<any>(selectedChat);
	const [search, setSearch] = useState<string>('');
	const allUsers = useSelector((state: any) => state.users.users);
	const debounceValue = useDebounce(search, 500);
	const [enteredMessage, setEnteredMessage] = useState<string>('');
	const messages = useSelector((state: any) => state.messages.messages);
	const loading = useSelector((state: any) => state.messages.loading);
	const [socketConnected, setSocketConnected] = useState<boolean>(false);

	useEffect(() => {
		socket = io(ENDPOINT);
		socket.emit('setup', loggedUser);
		socket.on('connection', () => setSocketConnected(true));
	}, []);

	useEffect(() => {
		if (openModal && selectedChat.groupChat) {
			dispatch(getUsers(debounceValue));
		}
	}, [debounceValue]);

	const handleRemoveUser = (id: string) => {
		const body = {
			chatId: selectedChat._id,
			userId: id,
		};
		dispatch(removeUserFromGroup(body));
	};

	const handleAddUser = (id: string) => {
		const existed = selectedChat.users.find((u: any) => u?._id === id);
		console.log(existed);

		if (!existed) {
			const body = {
				chatId: selectedChat._id,
				userId: id,
			};
			dispatch(addUserToGroup(body));
		} else alert('User Already in this group');
	};

	useEffect(() => {
		if (!selectedChat?.groupChat) {
			setData(selectedChat);
		}
	}, [selectedChat]);

	const scrollToBottom = () => {
		let chatContainer = document.getElementById('chatcontainer');
		if (chatContainer) {
			let scroll = chatContainer.scrollHeight - chatContainer.clientHeight;
			chatContainer.scrollTo(0, scroll);
		}
	};

	useEffect(() => {
		if (selectedChat?._id) {
			dispatch(getMessages(selectedChat?._id, socket));
			currentChattingWith = selectedChat?._id;
		}
	}, [selectedChat]);

	useEffect(() => {
		if (messages.length) {
			scrollToBottom();
		}
	});

	useEffect(() => {
		socket.on('message received', (newMessageReceived: any) => {
			if (
				!currentChattingWith ||
				currentChattingWith !== newMessageReceived.chat._id
			)
				return;
			else {
				dispatch(sendMessage(newMessageReceived));
			}
		});
	}, []);

	const messageSend = useCallback(() => {
		if (enteredMessage && enteredMessage.replace(/\s/g, '').length) {
			const payload = {
				chatId: selectedChat._id,
				text: enteredMessage,
			};
			dispatch(sendMessageApi(payload, socket));
			setEnteredMessage('');
		}
	}, [enteredMessage, selectedChat]);

	const onKeyDown = (e: any) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			messageSend();
		}
	};

	return (
		<>
			<Loader open={loading} />
			<div
				className={
					selectedChat?._id
						? 'bg-slate-700 h-[88vh] text-white w-full rounded-md flex flex-col  p-1 md:p-5 md:w-4/5'
						: 'bg-slate-700 h-[88vh] text-white w-full rounded-md md:flex flex-col  p-1 md:p-5 md:w-4/5 hidden'
				}
			>
				{selectedChat?._id ? (
					<>
						<div className='flex flex-row justify-between items-center'>
							<button
								className='flex items-center space-x-2 text-gray-300 hover:text-gray-100 p-3 md:hidden'
								onClick={() => dispatch(unSelectChat())}
							>
								<ArrowUturnLeftIcon className='h-6 w-6' />
							</button>
							<h1 className='text-2xl font-bold md:text-3xl uppercase'>
								{selectedChat?.groupChat
									? selectedChat?.chatName
									: getSender(loggedUser, selectedChat?.users).name}
							</h1>
							<div>
								<button
									className='flex items-center space-x-2 text-gray-300 hover:text-gray-100 p-3'
									onClick={() => setOpenModal(true)}
								>
									<EllipsisVerticalIcon className='h-6 w-6' />
								</button>
							</div>
						</div>
						{/* chatBox Starts from here */}
						<div className='flex flex-col  justify-between h-full overflow-y-auto bg-slate-600 rounded-md'>
							<div
								className='flex flex-col h-full overflow-y-scroll'
								id='chatcontainer'
							>
								<ScrollableChat messages={messages} />
							</div>
							<div className='flex flex-row space-x-2 p-2'>
								<input
									type='text'
									placeholder='Enter Message'
									className='w-full  bg-slate-700 text-white rounded-md p-2'
									value={enteredMessage}
									onChange={(e) => setEnteredMessage(e.target.value)}
									onKeyDown={onKeyDown}
								/>
								<Button
									className='bg-slate-700 text-white rounded-md p-2 disabled:bg-slate-500'
									onClick={messageSend}
									disabled={
										!enteredMessage || !enteredMessage.replace(/\s/g, '').length
									}
								>
									<PaperAirplaneIcon className='h-6 w-6' />
								</Button>
							</div>
						</div>
						{/* chatBox ends here */}
					</>
				) : (
					<h1 className='text-2xl font-bold text-center'>
						Select a chat to start messaging
					</h1>
				)}
			</div>
			{selectedChat?._id && (
				<Modal
					open={openModal}
					setOpen={setOpenModal}
					title={
						selectedChat?.groupChat
							? selectedChat?.chatName
							: getSender(loggedUser, selectedChat?.users).name
					}
				>
					{selectedChat?.groupChat ? (
						<>
							<div className='flex flex-col items-center space-y-2'>
								<TextField
									placeholder='Chat Name'
									value={data?.chatName}
									onChange={(e) =>
										setData({ ...data, chatName: e.target.value })
									}
								/>
								<TextField
									placeholder='Chat Description'
									value={data?.groupDescription}
									onChange={(e) =>
										setData({ ...data, groupDescription: e.target.value })
									}
								/>
								<TextField
									placeholder='Search Users'
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
								<div className='flex flex-row items-center space-x-2 overflow-auto'>
									{selectedChat.users
										.filter((user: any) => user._id !== loggedUser._id)
										.map((user: any) => (
											<Chips
												key={user._id}
												label={user.name}
												onClick={() => handleRemoveUser(user._id)}
												canDelete={isAdmin(loggedUser, selectedChat.groupAdmin)}
											/>
										))}
								</div>
								<div className='flex flex-col items-center space-y-1 overflow-auto'>
									{allUsers
										.filter((user: any) => user._id !== loggedUser._id)
										.map((user: any) => (
											<ChatCard
												lastMessage={user.email}
												key={user._id}
												name={user?.name}
												onClick={() => handleAddUser(user._id)}
												_id={user._id}
											/>
										))}
								</div>

								<button
									className='bg-red-500 text-white p-2 rounded-md'
									onClick={() => {
										isAdmin(loggedUser, selectedChat.groupAdmin)
											? dispatch(deleteChat(selectedChat))
											: handleRemoveUser(loggedUser._id);
										setOpenModal(false);
										dispatch(unSelectChat());
									}}
								>
									Delete Chat
								</button>
							</div>
						</>
					) : (
						<div className='flex flex-col items-center space-y-2'>
							<img
								src={getSender(loggedUser, selectedChat.users).avatar}
								alt='avatar'
								className='h-64 w-64 rounded-full'
								onClick={() => setOpenModal(true)}
							/>
							<p className='text-gray-500'>
								{getSender(loggedUser, selectedChat.users).email}
							</p>
							<button
								className='bg-red-500 text-white p-2 rounded-md'
								onClick={() => {
									dispatch(deleteChat(selectedChat));
									setOpenModal(false);
									dispatch(unSelectChat());
								}}
							>
								Delete Chat
							</button>
						</div>
					)}
				</Modal>
			)}
		</>
	);
};

export default ChatBox;
