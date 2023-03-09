import React from 'react';

interface LoaderProps {
	open: boolean;
}

const Loader = ({ open }: LoaderProps) => {
	if (!open) return null;
	return (
		<div className='fixed inset-0 flex items-center justify-center z-50'>
			<div className='absolute inset-0 bg-gray opacity-75'></div>
			<div className='loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4'></div>
		</div>
	);
};

export default Loader;
