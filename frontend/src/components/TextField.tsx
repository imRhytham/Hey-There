import React from 'react';

interface TextFieldProps {
	label?: string;
	value: string | number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	className?: string;
	placeholder?: string;
}

const TextField = ({
	label,
	value,
	onChange,
	type = 'text',
	className = '',
	placeholder = '',
}: TextFieldProps) => {
	return (
		<div className={`flex flex-col ${className}`}>
			<label className='text-sm'>{label}</label>
			<input
				placeholder={placeholder}
				type={type}
				value={value}
				onChange={onChange}
				className='px-4 py-2 rounded-md border border-gray-300'
			/>
		</div>
	);
};

export default TextField;
