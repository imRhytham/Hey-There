import React from 'react';

interface User {
	_id: string;
	name: string;
	lastMessage?: string;
	onClick?: () => void;
}

const ChatCard = ({ _id, name, lastMessage, onClick }: User) => {
	return (
		<>
			<div
				className='flex items-center space-x-2 bg-slate-300 p-1 px-2 rounded-md cursor-pointer'
				onClick={onClick}
			>
				<div className='flex flex-col'>
					<h1 className='text-lg font-bold'>{name}</h1>
					<p className='text-gray-500' title={lastMessage}>
						{lastMessage}
					</p>
				</div>
			</div>
		</>
	);
};

export default ChatCard;
