import React from 'react';

interface ToastProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	message: string;
	color: string;
	duration: number;
}

const Toast = ({ open, setOpen, message, color, duration }: ToastProps) => {
	React.useEffect(() => {
		const timer = setTimeout(() => {
			setOpen(false);
		}, duration);
		return () => clearTimeout(timer);
	}, [setOpen, duration]);

	if (!open) return null;
	return (
		<div
			className={`fixed bottom-0 right-0 m-4 bg-${color}-500 text-white px-4 py-2 rounded-md`}
		>
			{message}
		</div>
	);
};

export default Toast;
