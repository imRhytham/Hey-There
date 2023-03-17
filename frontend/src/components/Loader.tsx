import React from 'react';

interface LoaderProps {
	open: boolean;
}

const Loader = ({ open }: LoaderProps) => {
	if (!open) return null;
	return (
		<>
			<div className='fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-300 opacity-75 flex flex-col items-center justify-center'>
				<div className=' absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 z-50'>
					<div className='border-t-transparent border-solid animate-spin  rounded-full border-gray-800 border-4 h-16 w-16'></div>
				</div>
			</div>
		</>
	);
};

export default Loader;
