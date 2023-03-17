import React from 'react';
import { useSelector } from 'react-redux';
import ScrollableFeed from 'react-scrollable-feed';
import { isSameSender } from '../common/common';

interface Messages {
	messages: any;
}

const ScrollableChat = ({ messages }: Messages) => {
	const loggedUser = useSelector((state: any) => state?.auth?.user);
	return (
		<>
			<ScrollableFeed>
				{messages &&
					messages.map((m: any, i: number) => (
						<div className='flex p-1 items-center' key={m?._id}>
							{isSameSender(messages, i) &&
							m?.sender?._id !== loggedUser?._id ? (
								<>
									<img
										src={m?.sender?.avatar}
										alt='avatar'
										className='md:w-10 md:h-10 w-8 h-8 rounded-full mr-2'
									/>
								</>
							) : (
								<div className='md:w-10 md:h-10 w-8 h-8 rounded-full mr-2 '></div>
							)}
							<div
								className={`flex flex-col items-center space-y-1  ${
									m?.sender?._id === loggedUser?._id
										? 'ml-auto mr-2'
										: 'mr-auto'
								}`}
							>
								<p
									className={`p-2 rounded-md max-w-[200px] md:max-w-md h-auto break-words text-sm md:text-base ${
										m?.sender?._id === loggedUser?._id
											? 'bg-blue-500 text-white'
											: 'bg-gray-800'
									}`}
								>
									{m?.text}
								</p>
							</div>
						</div>
					))}
			</ScrollableFeed>
		</>
	);
};

export default ScrollableChat;
