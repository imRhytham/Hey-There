import React, { ReactNode } from 'react';

interface TextFieldProps {
	label?: string;
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	className?: string;
	placeholder?: string;
	icon?: ReactNode;
}

const TextField = ({
	label,
	value,
	onChange,
	type = 'text',
	className = '',
	placeholder = '',
	icon,
}: TextFieldProps) => {
	return (
		<div
			className={`flex flex-col space-y-1 border-2 border-gray-200 rounded-md p-3  ${className}`}
		>
			{label && <label className='text-sm font-semibold'>{label}</label>}
			<div className='flex items-center space-x-2'>
				<input
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className='focus:outline-none focus:border-none'
				/>
				{icon && icon}
			</div>
		</div>
	);
};

export default TextField;
