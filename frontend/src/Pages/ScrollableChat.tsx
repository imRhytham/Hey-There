import React from 'react';
import { useSelector } from 'react-redux';
import ScrollableFeed from 'react-scrollable-feed';
import { isLastMessage, isSameSender } from '../common/common';
import ToolTip from '../components/ToolTip';

interface Messages {
	messages: any;
}

const ScrollableChat = ({ messages }: Messages) => {
	const loggedUser = useSelector((state: any) => state?.auth?.user);
	return (
		<>
			<ScrollableFeed>
				{messages &&
					messages.map((m: any, i: number) => {
						console.log(
							isSameSender(messages, i, m, loggedUser?._id),
							isLastMessage(messages, i, loggedUser?._id)
						);

						return (
							<div className='flex p-1 ' key={m?._id}>
								{isSameSender(messages, i, m, loggedUser?._id) ||
								isLastMessage(messages, i, loggedUser?._id) ? (
									<>
										<ToolTip title={m?.sender?.name}>
											<img
												src={m?.sender?.avatar}
												alt='avatar'
												className='w-10 h-10 rounded-full mr-2'
											/>
										</ToolTip>
									</>
								) : (
									<div className='w-10 h-10 rounded-full mr-2 '></div>
								)}
								<div
									className={`flex flex-col items-center space-y-1  ${
										m?.sender?._id === loggedUser?._id
											? 'ml-auto mr-2'
											: 'mr-auto'
									}`}
								>
									<p
										className={`p-2 rounded-md ${
											m?.sender?._id === loggedUser?._id
												? 'bg-blue-500 text-white'
												: 'bg-gray-800'
										}`}
									>
										{m?.text}
									</p>
								</div>
							</div>
						);
					})}
			</ScrollableFeed>
		</>
	);
};

export default ScrollableChat;
