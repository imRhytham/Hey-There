import React from 'react';

interface ToastProps {
	open: boolean | string;
	message: string;
	color: string;
}

const Toast = ({ open, message, color }: ToastProps) => {
	if (!open) return null;
	return (
		<div
			className={
				color === 'red'
					? `fixed top-0 left-2/4 m-4 bg-red-500  text-white px-4 py-2 rounded-md`
					: `fixed top-0 left-2/4 m-4 bg-green-500  text-white px-4 py-2 rounded-md`
			}
		>
			{message}
		</div>
	);
};

export default Toast;
