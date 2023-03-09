import React from 'react';

interface ButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	className?: string;
	disabled?: boolean;
}

const Button = ({ children, onClick, className, disabled }: ButtonProps) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={`px-4 py-2 rounded-md ${className}`}
		>
			{children}
		</button>
	);
};

export default Button;
